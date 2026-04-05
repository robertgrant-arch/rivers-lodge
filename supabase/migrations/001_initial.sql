-- Rivers Lodge & Hunt Club — Initial Schema
-- Run this file first.

CREATE OR REPLACE FUNCTION requesting_clerk_id() RETURNS TEXT AS $$
  SELECT NULLIF(current_setting('request.jwt.claims', true)::json->>'sub', '')::TEXT;
$$ LANGUAGE sql STABLE;

CREATE OR REPLACE FUNCTION set_updated_at() RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE TABLE wedding_inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(), partner_1_name TEXT NOT NULL, partner_2_name TEXT NOT NULL,
  email TEXT NOT NULL, phone TEXT, preferred_dates DATE[], guest_count_estimate TEXT,
  ceremony_preference TEXT, referral_source TEXT, what_matters_most TEXT,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new','contacted','qualified','booked','declined')),
  assigned_to TEXT, internal_notes TEXT, created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE TRIGGER trg_wedding_inquiries_updated_at BEFORE UPDATE ON wedding_inquiries FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TABLE wedding_bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(), inquiry_id UUID REFERENCES wedding_inquiries(id) ON DELETE SET NULL,
  date DATE NOT NULL, package_id TEXT, guest_count INT, ceremony_space TEXT, reception_space TEXT,
  lodging_nights INT NOT NULL DEFAULT 0,
  contract_status TEXT NOT NULL DEFAULT 'pending' CHECK (contract_status IN ('pending','signed','active','complete')),
  deposit_paid BOOLEAN NOT NULL DEFAULT false, deposit_amount NUMERIC(10,2), final_payment_due DATE,
  stripe_payment_id TEXT, internal_notes TEXT, created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE TRIGGER trg_wedding_bookings_updated_at BEFORE UPDATE ON wedding_bookings FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TABLE wedding_dates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(), date DATE NOT NULL UNIQUE,
  status TEXT NOT NULL DEFAULT 'available' CHECK (status IN ('available','limited','held','inquiry_pending','booked','blackout','closed')),
  internal_note TEXT, inquiry_id UUID REFERENCES wedding_inquiries(id) ON DELETE SET NULL,
  booking_id UUID REFERENCES wedding_bookings(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE TRIGGER trg_wedding_dates_updated_at BEFORE UPDATE ON wedding_dates FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE INDEX idx_wedding_dates_date ON wedding_dates(date);
CREATE INDEX idx_wedding_dates_status ON wedding_dates(status);

CREATE TABLE event_inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(), contact_name TEXT NOT NULL, company TEXT,
  email TEXT NOT NULL, phone TEXT, event_type TEXT, preferred_date DATE, guest_count TEXT,
  contact_pref TEXT CHECK (contact_pref IN ('email','phone','either')),
  message TEXT, status TEXT NOT NULL DEFAULT 'new', created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE planning_guide_leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(), email TEXT NOT NULL UNIQUE, created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE membership_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(), first_name TEXT NOT NULL, last_name TEXT NOT NULL,
  email TEXT NOT NULL, phone TEXT, referral_source TEXT, statement TEXT,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new','reviewing','accepted','declined','waitlisted')),
  internal_notes TEXT, created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE TRIGGER trg_membership_applications_updated_at BEFORE UPDATE ON membership_applications FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TABLE members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(), clerk_id TEXT UNIQUE NOT NULL,
  first_name TEXT NOT NULL, last_name TEXT NOT NULL, email TEXT NOT NULL UNIQUE, phone TEXT,
  membership_tier TEXT NOT NULL DEFAULT 'standard', membership_start DATE, membership_renewal DATE,
  guest_allotment INT NOT NULL DEFAULT 2, emergency_contact JSONB, preferences JSONB,
  stripe_customer_id TEXT, deleted_at TIMESTAMPTZ, created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE TRIGGER trg_members_updated_at BEFORE UPDATE ON members FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE INDEX idx_members_clerk_id ON members(clerk_id);

CREATE TABLE booking_resources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(), resource_key TEXT UNIQUE NOT NULL, label TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('lodging','event_space','guided_recreation')),
  capacity INT NOT NULL, max_concurrent_bookings INT NOT NULL DEFAULT 1, description TEXT, active BOOLEAN NOT NULL DEFAULT true
);

CREATE TABLE member_bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(), member_id UUID NOT NULL REFERENCES members(id) ON DELETE RESTRICT,
  resource_key TEXT REFERENCES booking_resources(resource_key),
  type TEXT NOT NULL CHECK (type IN ('lodging','guided_recreation','event_space','private_request')),
  start_date DATE NOT NULL, end_date DATE NOT NULL, party_size INT NOT NULL DEFAULT 1, guests JSONB,
  member_notes TEXT, staff_notes TEXT, quoted_amount NUMERIC(10,2), stripe_payment_intent_id TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','confirmed','modified','cancelled','completed')),
  deleted_at TIMESTAMPTZ, created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), confirmed_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), CONSTRAINT end_after_start CHECK (end_date >= start_date)
);
CREATE TRIGGER trg_member_bookings_updated_at BEFORE UPDATE ON member_bookings FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE INDEX idx_member_bookings_member_id ON member_bookings(member_id);
CREATE INDEX idx_member_bookings_dates ON member_bookings(start_date, end_date);
CREATE INDEX idx_member_bookings_resource ON member_bookings(resource_key, start_date, end_date);

CREATE TABLE member_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(), sanity_id TEXT UNIQUE, title TEXT NOT NULL,
  event_date TIMESTAMPTZ NOT NULL, description TEXT, capacity INT, host TEXT, image_url TEXT,
  visibility TEXT NOT NULL DEFAULT 'all_members', created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_member_events_date ON member_events(event_date);

CREATE TABLE event_rsvps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(), event_id UUID NOT NULL REFERENCES member_events(id) ON DELETE CASCADE,
  member_id UUID NOT NULL REFERENCES members(id) ON DELETE CASCADE, guest_count INT NOT NULL DEFAULT 0,
  note TEXT, waitlisted BOOLEAN NOT NULL DEFAULT false, created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), UNIQUE (event_id, member_id)
);
CREATE TRIGGER trg_event_rsvps_updated_at BEFORE UPDATE ON event_rsvps FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE INDEX idx_event_rsvps_event_id ON event_rsvps(event_id);

CREATE TABLE message_threads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(), member_id UUID NOT NULL REFERENCES members(id) ON DELETE CASCADE,
  subject TEXT NOT NULL, status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open','closed')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE TRIGGER trg_message_threads_updated_at BEFORE UPDATE ON message_threads FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE INDEX idx_message_threads_member_id ON message_threads(member_id);

CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(), thread_id UUID NOT NULL REFERENCES message_threads(id) ON DELETE CASCADE,
  sender_type TEXT NOT NULL CHECK (sender_type IN ('member','staff')), sender_name TEXT NOT NULL,
  body TEXT NOT NULL, sent_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), read_at TIMESTAMPTZ
);
CREATE INDEX idx_messages_thread_id ON messages(thread_id);
