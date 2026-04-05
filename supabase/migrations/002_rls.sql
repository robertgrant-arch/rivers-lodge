-- Rivers Lodge — Row Level Security
-- Run after 001_initial.sql

ALTER TABLE members ENABLE ROW LEVEL SECURITY;
ALTER TABLE member_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_rsvps ENABLE ROW LEVEL SECURITY;
ALTER TABLE message_threads ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "member_select_own" ON members FOR SELECT USING (clerk_id = requesting_clerk_id());
CREATE POLICY "member_update_own" ON members FOR UPDATE USING (clerk_id = requesting_clerk_id());

CREATE POLICY "member_select_own_bookings" ON member_bookings FOR SELECT USING (member_id = (SELECT id FROM members WHERE clerk_id = requesting_clerk_id()));
CREATE POLICY "member_insert_own_bookings" ON member_bookings FOR INSERT WITH CHECK (member_id = (SELECT id FROM members WHERE clerk_id = requesting_clerk_id()));
CREATE POLICY "member_cancel_own_pending" ON member_bookings FOR UPDATE USING (member_id = (SELECT id FROM members WHERE clerk_id = requesting_clerk_id()) AND status = 'pending') WITH CHECK (status = 'cancelled');

CREATE POLICY "member_select_own_rsvps" ON event_rsvps FOR SELECT USING (member_id = (SELECT id FROM members WHERE clerk_id = requesting_clerk_id()));
CREATE POLICY "member_upsert_own_rsvps" ON event_rsvps FOR INSERT WITH CHECK (member_id = (SELECT id FROM members WHERE clerk_id = requesting_clerk_id()));
CREATE POLICY "member_update_own_rsvps" ON event_rsvps FOR UPDATE USING (member_id = (SELECT id FROM members WHERE clerk_id = requesting_clerk_id()));

CREATE POLICY "member_select_own_threads" ON message_threads FOR SELECT USING (member_id = (SELECT id FROM members WHERE clerk_id = requesting_clerk_id()));
CREATE POLICY "member_insert_own_threads" ON message_threads FOR INSERT WITH CHECK (member_id = (SELECT id FROM members WHERE clerk_id = requesting_clerk_id()));

CREATE POLICY "member_select_own_messages" ON messages FOR SELECT USING (thread_id IN (SELECT id FROM message_threads WHERE member_id = (SELECT id FROM members WHERE clerk_id = requesting_clerk_id())));
CREATE POLICY "member_insert_own_messages" ON messages FOR INSERT WITH CHECK (sender_type = 'member' AND thread_id IN (SELECT id FROM message_threads WHERE member_id = (SELECT id FROM members WHERE clerk_id = requesting_clerk_id())));
CREATE POLICY "member_mark_read" ON messages FOR UPDATE USING (sender_type = 'staff' AND thread_id IN (SELECT id FROM message_threads WHERE member_id = (SELECT id FROM members WHERE clerk_id = requesting_clerk_id()))) WITH CHECK (true);
