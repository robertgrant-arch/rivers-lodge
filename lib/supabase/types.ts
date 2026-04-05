export type WeddingDateStatus = 'available' | 'limited' | 'held' | 'inquiry_pending' | 'booked' | 'blackout' | 'closed'
export type WeddingInquiryStatus = 'new' | 'contacted' | 'qualified' | 'booked' | 'declined'
export type MemberBookingType = 'lodging' | 'guided_recreation' | 'event_space' | 'private_request'
export type MemberBookingStatus = 'pending' | 'confirmed' | 'modified' | 'cancelled' | 'completed'
export type MessageSenderType = 'member' | 'staff'
export type MembershipApplicationStatus = 'new' | 'reviewing' | 'accepted' | 'declined' | 'waitlisted'

export interface WeddingDateRow { id: string; date: string; status: WeddingDateStatus; internal_note: string | null; inquiry_id: string | null; booking_id: string | null; created_at: string; updated_at: string }
export interface WeddingInquiryRow { id: string; partner_1_name: string; partner_2_name: string; email: string; phone: string | null; preferred_dates: string[] | null; guest_count_estimate: string | null; ceremony_preference: string | null; referral_source: string | null; what_matters_most: string | null; status: WeddingInquiryStatus; assigned_to: string | null; internal_notes: string | null; created_at: string; updated_at: string }
export interface WeddingBookingRow { id: string; inquiry_id: string | null; date: string; package_id: string | null; guest_count: number | null; ceremony_space: string | null; reception_space: string | null; lodging_nights: number; contract_status: 'pending' | 'signed' | 'active' | 'complete'; deposit_paid: boolean; deposit_amount: number | null; final_payment_due: string | null; stripe_payment_id: string | null; internal_notes: string | null; created_at: string; updated_at: string }
export interface EventInquiryRow { id: string; contact_name: string; company: string | null; email: string; phone: string | null; event_type: string | null; preferred_date: string | null; guest_count: string | null; contact_pref: 'email' | 'phone' | 'either' | null; message: string | null; status: string; created_at: string }
export interface MemberRow { id: string; clerk_id: string; first_name: string; last_name: string; email: string; phone: string | null; membership_tier: string; membership_start: string | null; membership_renewal: string | null; guest_allotment: number; emergency_contact: Record<string, string> | null; preferences: Record<string, unknown> | null; stripe_customer_id: string | null; deleted_at: string | null; created_at: string; updated_at: string }
export interface BookingResourceRow { id: string; resource_key: string; label: string; type: 'lodging' | 'event_space' | 'guided_recreation'; capacity: number; max_concurrent_bookings: number; description: string | null; active: boolean }
export interface MemberBookingRow { id: string; member_id: string; resource_key: string | null; type: MemberBookingType; start_date: string; end_date: string; party_size: number; guests: { name: string; notes?: string }[] | null; member_notes: string | null; staff_notes: string | null; quoted_amount: number | null; stripe_payment_intent_id: string | null; status: MemberBookingStatus; deleted_at: string | null; created_at: string; confirmed_at: string | null; updated_at: string }
export interface MemberEventRow { id: string; sanity_id: string | null; title: string; event_date: string; description: string | null; capacity: number | null; host: string | null; image_url: string | null; visibility: string; created_at: string }
export interface EventRsvpRow { id: string; event_id: string; member_id: string; guest_count: number; note: string | null; waitlisted: boolean; created_at: string; updated_at: string }
export interface MessageThreadRow { id: string; member_id: string; subject: string; status: 'open' | 'closed'; created_at: string; updated_at: string }
export interface MessageRow { id: string; thread_id: string; sender_type: MessageSenderType; sender_name: string; body: string; sent_at: string; read_at: string | null }
export interface PlanningGuideLeadRow { id: string; email: string; created_at: string }
export interface MembershipApplicationRow { id: string; first_name: string; last_name: string; email: string; phone: string | null; referral_source: string | null; statement: string | null; status: MembershipApplicationStatus; internal_notes: string | null; created_at: string; updated_at: string }

export interface Database {
  public: {
    Tables: {
      wedding_dates: { Row: WeddingDateRow; Insert: Omit<WeddingDateRow, 'id' | 'created_at' | 'updated_at'>; Update: Partial<Omit<WeddingDateRow, 'id' | 'created_at'>> }
      wedding_inquiries: { Row: WeddingInquiryRow; Insert: Omit<WeddingInquiryRow, 'id' | 'created_at' | 'updated_at'>; Update: Partial<Omit<WeddingInquiryRow, 'id' | 'created_at'>> }
      wedding_bookings: { Row: WeddingBookingRow; Insert: Omit<WeddingBookingRow, 'id' | 'created_at' | 'updated_at'>; Update: Partial<Omit<WeddingBookingRow, 'id' | 'created_at'>> }
      event_inquiries: { Row: EventInquiryRow; Insert: Omit<EventInquiryRow, 'id' | 'created_at'>; Update: Partial<Omit<EventInquiryRow, 'id' | 'created_at'>> }
      members: { Row: MemberRow; Insert: Omit<MemberRow, 'id' | 'created_at' | 'updated_at'>; Update: Partial<Omit<MemberRow, 'id' | 'created_at'>> }
      booking_resources: { Row: BookingResourceRow; Insert: Omit<BookingResourceRow, 'id'>; Update: Partial<Omit<BookingResourceRow, 'id'>> }
      member_bookings: { Row: MemberBookingRow; Insert: Omit<MemberBookingRow, 'id' | 'created_at' | 'updated_at'>; Update: Partial<Omit<MemberBookingRow, 'id' | 'created_at'>> }
      member_events: { Row: MemberEventRow; Insert: Omit<MemberEventRow, 'id' | 'created_at'>; Update: Partial<Omit<MemberEventRow, 'id' | 'created_at'>> }
      event_rsvps: { Row: EventRsvpRow; Insert: Omit<EventRsvpRow, 'id' | 'created_at' | 'updated_at'>; Update: Partial<Omit<EventRsvpRow, 'id' | 'created_at'>> }
      message_threads: { Row: MessageThreadRow; Insert: Omit<MessageThreadRow, 'id' | 'created_at' | 'updated_at'>; Update: Partial<Omit<MessageThreadRow, 'id' | 'created_at'>> }
      messages: { Row: MessageRow; Insert: Omit<MessageRow, 'id' | 'sent_at'>; Update: Partial<Omit<MessageRow, 'id'>> }
      planning_guide_leads: { Row: PlanningGuideLeadRow; Insert: Omit<PlanningGuideLeadRow, 'id' | 'created_at'>; Update: Partial<Omit<PlanningGuideLeadRow, 'id' | 'created_at'>> }
      membership_applications: { Row: MembershipApplicationRow; Insert: Omit<MembershipApplicationRow, 'id' | 'created_at' | 'updated_at'>; Update: Partial<Omit<MembershipApplicationRow, 'id' | 'created_at'>> }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
  }
}
