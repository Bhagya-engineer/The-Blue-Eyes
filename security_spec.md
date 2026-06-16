# Firebase Security Specification & TDD Spec

## Data Invariants
1. **No Anonymous Sabotage**: Individuals cannot alter or delete someone else's booking or testimonial. Testimonials and Bookings are write-once only.
2. **Strict Field Structures**: Testimonials must have exactly 6 fields with strict size bounds (no 1MB text strings inside names or ratings).
3. **No Blanket Reads**: Nobody can run list queries on active bookings to scrape other customers' phone numbers or email addresses.

## The "Dirty Dozen" blocked payloads:
1. Review with missing fields (e.g. no `rating`).
2. Review with extra "ghost" fields (e.g. trying to inject `isAdmin: true` into a profile update).
3. Review rating out of bounds (Rating = 6).
4. Review with oversized elements (Name of 10,000 characters).
5. Review with incorrect types (Comment as a number).
6. Booking with invalid ID path character (e.g. `/bookings/!!!dangerousId_!!!`).
7. Booking with missing contact info.
8. Booking with negative estimated price count.
9. Attempt to delete existing booking.
10. Attempt to update existing review.
11. Query list on all bookings (scrapes collection).
12. Booking metadata validation payload mismatches.
