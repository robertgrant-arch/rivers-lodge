-- Rivers Lodge — Seed Data
-- IMPORTANT: Update capacity values to match confirmed property specifications (§19.3).

INSERT INTO booking_resources (resource_key, label, type, capacity, max_concurrent_bookings, description, active)
VALUES
  ('lodge', 'The Lodge', 'lodging', 20, 1, 'Main lodge facility.', true),
  ('event_pavilion', 'The Event Pavilion', 'event_space', 200, 1, 'Covered pavilion for receptions.', true),
  ('guided_hunt', 'Guided Hunt', 'guided_recreation', 8, 2, 'Guided hunting experience.', true),
  ('guided_fishing', 'Guided Fishing', 'guided_recreation', 6, 2, 'Guided fishing on the Marais des Cygnes.', true)
ON CONFLICT (resource_key) DO NOTHING;
