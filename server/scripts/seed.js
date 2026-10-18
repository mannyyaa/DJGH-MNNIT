/**
 * Seed script — populates the database with initial data.
 * Run once: node scripts/seed.js
 * Safe to re-run: existing records are skipped (upserts used where appropriate).
 */

require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') })
const mongoose = require('mongoose')

const AdminUser       = require('../models/AdminUser')
const Notice          = require('../models/Notice')
const CommitteeMember = require('../models/CommitteeMember')
const Facility        = require('../models/Facility')
const Event           = require('../models/Event')
const FAQ             = require('../models/FAQ')
const EmergencyContact= require('../models/EmergencyContact')
const MessMenu        = require('../models/MessMenu')

async function seed() {
  // ── Validate required environment variables before touching the database ──
  if (!process.env.ADMIN_PASSWORD) {
    console.error('✗ ADMIN_PASSWORD is not set in your .env file.')
    console.error('  Copy server/.env.example to server/.env and fill in all required values.')
    process.exit(1)
  }

  await mongoose.connect(process.env.MONGODB_URI)
  console.log('✔ Connected to MongoDB')

  // ── Admin User ──────────────────────────────────────────────────────────────
  const existingAdmin = await AdminUser.findOne({ username: process.env.ADMIN_USERNAME || 'admin' })
  if (!existingAdmin) {
    await AdminUser.create({
      username:     process.env.ADMIN_USERNAME || 'admin',
      passwordHash: process.env.ADMIN_PASSWORD,   // required — no hardcoded fallback
      role:         'superadmin',
      displayName:  'Hostel Administrator',
    })
    console.log('✔ Admin user created')
  } else {
    console.log('· Admin user already exists — skipping')
  }

  // ── Notices ─────────────────────────────────────────────────────────────────
  const noticeCount = await Notice.countDocuments()
  if (noticeCount === 0) {
    await Notice.insertMany([
      {
        title: 'Mess Timing Change – Winter Schedule',
        category: 'Mess',
        important: true,
        status: 'published',
        description: 'With effect from 15 August 2026, breakfast timings will be revised to 7:30 AM – 9:30 AM for the winter season. Students are advised to note the revised timings.',
        publishedBy: 'Admin',
      },
      {
        title: 'Hostel Gate Closing Time – Revised',
        category: 'Hostel',
        important: true,
        status: 'published',
        description: 'The hostel gate closing time has been revised to 10:00 PM with effect from 10 August 2026.',
        publishedBy: 'Admin',
      },
      {
        title: 'Annual Hostel Day Celebrations – Volunteers Required',
        category: 'Events',
        important: false,
        status: 'published',
        description: 'The Hostel Committee invites volunteers for the upcoming Annual Hostel Day celebrations scheduled for 20 August 2026.',
        publishedBy: 'Admin',
      },
      {
        title: 'Fire Safety Drill – 15 August 2026',
        category: 'Important',
        important: true,
        status: 'published',
        description: 'A mandatory fire safety drill will be conducted on 15 August 2026 at 4:00 PM. All residents are required to participate.',
        publishedBy: 'Admin',
      },
    ])
    console.log('✔ Notices seeded')
  } else {
    console.log('· Notices already seeded — skipping')
  }

  // ── Committee Members ───────────────────────────────────────────────────────
  const committeeCount = await CommitteeMember.countDocuments()
  if (committeeCount === 0) {
    await CommitteeMember.insertMany([
      { name: 'Dr. Pragya Dwivedi',  position: 'Warden', committeeType: 'administration', department: 'Dept. of Computer Science & Engineering', contact: '7839007927', officeHours: 'Mon–Fri, 9–5', displayOrder: 1 },
      { name: 'Dr. Kanika Saxena',   position: 'Warden', committeeType: 'administration', department: 'Dept. of Civil Engineering',                contact: '7839007929', officeHours: 'Mon–Fri, 9–5', displayOrder: 2 },
      { name: 'Dr. Asmita Mishra',   position: 'Warden', committeeType: 'administration', department: 'Dept. of Chemical Engineering',             contact: '7566744227', officeHours: 'Mon–Fri, 9–5', displayOrder: 3 },
      { name: '[Caretaker Name]',    position: 'Hostel Caretaker', committeeType: 'administration', contact: '[Phone]', officeHours: 'All Days, 8–8', displayOrder: 4 },
      { name: '[President Name]',         position: 'President',         committeeType: 'hostel', year: 'B.Tech [Year], [Branch]', responsibilities: 'Overall hostel coordination', displayOrder: 1 },
      { name: '[Vice-President Name]',    position: 'Vice-President',    committeeType: 'hostel', year: 'B.Tech [Year], [Branch]', responsibilities: 'Assisting president', displayOrder: 2 },
      { name: '[General Secretary Name]', position: 'General Secretary', committeeType: 'hostel', year: 'B.Tech [Year], [Branch]', responsibilities: 'Record keeping and notices', displayOrder: 3 },
      { name: '[Mess Coordinator Name]',  position: 'Mess Coordinator',  committeeType: 'mess',  year: '[Year/Branch]', responsibilities: 'Overall mess coordination', displayOrder: 1 },
      { name: '[Mess Rep 1 Name]',        position: 'Mess Representative',committeeType: 'mess', year: '[Year/Branch]', responsibilities: 'Morning shift monitoring', displayOrder: 2 },
    ])
    console.log('✔ Committee members seeded')
  } else {
    console.log('· Committee already seeded — skipping')
  }

  // ── Facilities ──────────────────────────────────────────────────────────────
  const facilityCount = await Facility.countDocuments()
  if (facilityCount === 0) {
    const facilities = [
      { category: 'Accommodation',      name: 'Triple Occupancy Rooms',  icon: 'Bed',         description: '117 triple-occupancy rooms with study desks, wardrobes and cots for each resident.', displayOrder: 1 },
      { category: 'Accommodation',      name: 'Hall Rooms (4-Seater)',   icon: 'Users',        description: '5 hall rooms each accommodating 4 students.', displayOrder: 2 },
      { category: 'Accommodation',      name: 'Common Halls',            icon: 'Layout',       description: '4 common halls for relaxation, community gatherings and shared activities.', displayOrder: 3 },
      { category: 'Academic',           name: 'Study Area',              icon: 'BookMarked',   description: 'Dedicated study areas available for residents.', displayOrder: 1 },
      { category: 'Academic',           name: 'Wi-Fi Internet',          icon: 'Wifi',         description: 'High-speed Wi-Fi available throughout the hostel premises.', displayOrder: 2 },
      { category: 'Recreation',         name: 'Common Room',             icon: 'Tv2',          description: 'Common room with television and comfortable seating.', displayOrder: 1 },
      { category: 'Recreation',         name: 'Indoor Games',            icon: 'Gamepad2',     description: 'Carrom, chess, table tennis and other indoor activities.', displayOrder: 2 },
      { category: 'Essential Services', name: 'Laundry Services',        icon: 'Wind',         description: 'Washing machines on each floor with defined time slots.', displayOrder: 1 },
      { category: 'Essential Services', name: 'RO Drinking Water',       icon: 'Droplets',     description: 'Purified RO drinking water available 24 hours on every floor.', displayOrder: 2 },
      { category: 'Essential Services', name: 'Power Backup',            icon: 'Zap',          description: 'Uninterrupted power backup for essential areas.', displayOrder: 3 },
      { category: 'Safety',             name: '24/7 Security',           icon: 'ShieldCheck',  description: 'Round-the-clock security personnel at the gate and premises.', displayOrder: 1 },
      { category: 'Safety',             name: 'CCTV Surveillance',       icon: 'Camera',       description: 'CCTV cameras at strategic locations throughout the hostel.', displayOrder: 2 },
      { category: 'Safety',             name: 'Fire Safety',             icon: 'Flame',        description: 'Fire extinguishers, smoke detectors and emergency exits.', displayOrder: 3 },
    ]
    await Facility.insertMany(facilities)
    console.log('✔ Facilities seeded')
  } else {
    console.log('· Facilities already seeded — skipping')
  }

  // ── FAQs ────────────────────────────────────────────────────────────────────
  const faqCount = await FAQ.countDocuments()
  if (faqCount === 0) {
    await FAQ.insertMany([
      { question: 'How can I report a hostel maintenance issue?',  answer: 'Visit the Complaints section and fill in the form. You will receive a unique Complaint ID to track progress.', displayOrder: 1 },
      { question: "Where can I find today's mess menu?",           answer: "Navigate to the Mess section for today's menu and timings.", displayOrder: 2 },
      { question: 'How can I track my complaint?',                 answer: 'Go to the Complaints page and enter your Complaint ID in the Track section.', displayOrder: 3 },
      { question: 'Who should I contact in an emergency?',         answer: 'Contact the Security Desk immediately. Emergency numbers are on the Contact page.', displayOrder: 4 },
      { question: 'How can I contact the hostel committee?',       answer: "Details are on the Committee page. You can also reach out during the committee's open hours.", displayOrder: 5 },
      { question: 'What are the hostel timings?',                  answer: 'Gate closes at 10:00 PM. Mess: Breakfast 7–9 AM, Lunch 12–2 PM, Snacks 5–6 PM, Dinner 7:30–9:30 PM.', displayOrder: 6 },
      { question: 'Is Wi-Fi available in the hostel?',             answer: 'Yes, high-speed Wi-Fi is available throughout. For issues, file a complaint under Internet/Wi-Fi.', displayOrder: 7 },
    ])
    console.log('✔ FAQs seeded')
  } else {
    console.log('· FAQs already seeded — skipping')
  }

  // ── Emergency Contacts ──────────────────────────────────────────────────────
  const contactCount = await EmergencyContact.countDocuments()
  if (contactCount === 0) {
    await EmergencyContact.insertMany([
      { title: 'Hostel Security',    number: '[Security Desk]',    description: 'For immediate security concerns or on-campus emergencies.',       icon: 'Shield',     color: 'navy',   available: '24 / 7', displayOrder: 1 },
      { title: 'Medical Emergency',  number: '[Medical Centre]',   description: 'MNNIT Medical Centre for health emergencies.',                    icon: 'HeartPulse', color: 'red',    available: '24 / 7', displayOrder: 2 },
      { title: 'Fire Emergency',     number: '101',                description: 'Evacuate immediately and call fire emergency.',                   icon: 'Flame',      color: 'orange', available: '24 / 7', displayOrder: 3 },
      { title: 'Chief Warden',       number: '[Warden Contact]',   description: 'For urgent hostel administration matters.',                       icon: 'User',       color: 'gold',   available: 'Office Hours', displayOrder: 4 },
      { title: 'Hostel Caretaker',   number: '[Caretaker Contact]',description: 'For day-to-day hostel maintenance and operations.',               icon: 'Wrench',     color: 'teal',   available: '8 AM – 8 PM',  displayOrder: 5 },
      { title: 'Police Emergency',   number: '100',                description: 'National police emergency helpline.',                             icon: 'Phone',      color: 'gray',   available: '24 / 7', displayOrder: 6 },
    ])
    console.log('✔ Emergency contacts seeded')
  } else {
    console.log('· Emergency contacts already seeded — skipping')
  }

  // ── Mess Menu ───────────────────────────────────────────────────────────────
  const menuCount = await MessMenu.countDocuments()
  if (menuCount === 0) {
    await MessMenu.create({
      weekLabel: 'Default Menu',
      isActive: true,
      menu: new Map([
        ['0', { breakfast: 'Poha, Milk, Boiled Egg',    lunch: 'Rice, Roti, Dal, Paneer, Salad',         snacks: 'Samosa, Tea',      dinner: 'Rice, Roti, Dal, Mix Veg, Curd' }],
        ['1', { breakfast: 'Upma, Bread Butter, Tea',   lunch: 'Rice, Roti, Dal, Egg Curry, Salad',      snacks: 'Bread Pakora, Tea', dinner: 'Rice, Roti, Kadhi, Aloo Fry' }],
        ['2', { breakfast: 'Idli Sambhar, Tea',         lunch: 'Rice, Roti, Rajma, Aloo Gobi, Salad',    snacks: 'Veg Cutlet, Coffee',dinner: 'Rice, Roti, Dal, Matar Paneer' }],
        ['3', { breakfast: 'Paratha, Curd, Tea',        lunch: 'Rice, Roti, Dal Makhni, Palak Paneer, Kheer', snacks: 'Mathri, Tea', dinner: 'Rice, Roti, Dal, Baingan Bharta' }],
        ['4', { breakfast: 'Puri Sabzi, Tea',           lunch: 'Rice, Roti, Chhole, Mix Veg, Salad',     snacks: 'Aloo Tikki, Tea',  dinner: 'Rice, Roti, Chhole, Jeera Aloo' }],
        ['5', { breakfast: 'Aloo Bread Toast, Tea',     lunch: 'Pulao, Roti, Dal, Kadhi, Salad',         snacks: 'Bhel Puri, Tea',   dinner: 'Fried Rice, Roti, Dal, Seasonal Veg' }],
        ['6', { breakfast: 'Poha, Halwa, Milk',         lunch: 'Special Meal, Roti, Dal, Dessert',        snacks: 'Maggi, Tea',       dinner: 'Biryani, Raita, Salad, Sweet' }],
      ]),
      timings: {
        breakfast: '7:00 AM – 9:00 AM',
        lunch:     '12:00 PM – 2:00 PM',
        snacks:    '5:00 PM – 6:00 PM',
        dinner:    '7:30 PM – 9:30 PM',
      },
      updatedBy: 'seed',
    })
    console.log('✔ Mess menu seeded')
  } else {
    console.log('· Mess menu already seeded — skipping')
  }

  await mongoose.disconnect()
  console.log('\n✅ Seed complete.')
}

seed().catch(err => {
  console.error('Seed failed:', err)
  process.exit(1)
})
