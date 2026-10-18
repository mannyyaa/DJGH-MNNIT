// ─── MESS DATA ────────────────────────────────────────────────────────────────

export const messTimings = [
  { meal: 'Breakfast',       time: '7:30 AM – 9:00 AM' },
  { meal: 'Lunch',           time: '12:30 PM – 2:00 PM' },
  { meal: 'Evening Snacks',  time: '5:00 PM – 6:30 PM' },
  { meal: 'Dinner',          time: '8:00 PM – 9:00 PM' },
]

export const todayMenu = {
  breakfast: {
    time: '7:30 AM – 9:00 AM',
    items: ['Aloo Paratha, Garlic Chutney, Pickle', 'Bread, Butter, Jam', 'Cornflakes, Sprouts', 'Fruit, Tomato Sauce', 'Tea / Coffee / Bournvita', 'Milk'],
  },
  lunch: {
    time: '12:30 PM – 2:00 PM',
    items: ['Arhar Dal', 'Lauki', 'Tomato Rice + Rice', 'Roti', 'Pickle, Cucumber, Onion', 'Coriander, Lemon, Chilli, Papad'],
  },
  snacks: {
    time: '5:00 PM – 6:30 PM',
    items: ['Maggie / Noodles', 'Coffee'],
  },
  dinner: {
    time: '8:00 PM – 9:00 PM',
    items: ['Malai Dum Aloo', 'Chole', 'Gulab Jamun', 'Rice, Roti', 'Pickle, Cucumber, Onion, Lemon, Chilli', 'Milk + Bournvita / Coffee'],
  },
}

export const weeklyMenu = {
  days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  meals: {
    Breakfast: [
      'Aloo Paratha, Garlic Chutney, Pickle, Fruit, Tea/Coffee/Bournvita, Bread, Butter, Jam, Cornflakes, Sprouts, Milk',
      'Sandwich, Tea/Coffee/Bournvita, Bread, Butter, Jam, Cornflakes, Sprouts, Tomato Sauce, Milk, Fruit',
      'Plain Idli, Sambar, Coconut Chutney, Tea/Coffee/Bournvita, Bread, Butter, Jam, Cornflakes, Sprouts, Milk, Fruit',
      'Aloo Ki Sabzi, Paneer Kachori, Tea/Coffee/Bournvita, Bread, Butter, Jam, Cornflakes, Sprouts, Milk, Fruit',
      'Paneer Paratha, Garlic Chutney, Pickle, Tea/Coffee/Bournvita, Bread, Butter, Jam, Cornflakes, Sprouts, Milk, Fruit',
      'Poha, Jalebi, Curd, Tea/Coffee/Bournvita, Bread, Butter, Jam, Cornflakes, Sprouts, Milk, Fruit (8:00–10:00 AM)',
      'Uttapam, Spicy Tomato Chutney, Tea/Coffee/Bournvita, Bread, Butter, Jam, Cornflakes, Sprouts, Milk, Fruit (8:00–10:00 AM)',
    ],
    Lunch: [
      'Arhar Dal, Lauki, Tomato Rice, Rice, Roti, Pickle, Cucumber, Onion, Coriander, Lemon, Chilli, Papad',
      'Mix Dal, Bhindi, Lemon Rice, Curd, Roti, Pickle, Cucumber, Onion, Coriander, Lemon, Chilli',
      'Kadhi, Aloo Bhujia, Rice, Roti, Pickle, Cucumber, Onion, Coriander, Lemon, Green Chilli',
      'Rajma, Mix Veg, Dahi Bada, Sweet Chutney, Rice, Roti, Pickle, Cucumber, Onion, Coriander, Lemon, Chilli',
      'Moong Dal, Kadhai Paneer, Jeera Rice, Boondi Raita, Roti, Pickle, Cucumber, Onion, Coriander, Lemon, Chilli',
      'Chole, Bhature, Rice, Pickle, Cucumber, Onion, Coriander, Lemon, Chilli, Custard',
      'Arhar Dal, Baingan Bharta, Jeera Rice, Chana, Roti, Pickle, Cucumber, Onion, Coriander, Lemon, Chilli',
    ],
    'Eve. Snacks': [
      'Maggie / Noodles, Coffee',
      'French Fries, Cold Coffee, Coffee',
      'Bhujia, Lassi, Tea',
      'Papdi Chaat, Thandai, Coffee',
      'Aloo Tikki Chaat, Shikanji, Tea',
      '— Off —',
      'Golgappe, Tea, Matar, Boiled Potato, Curd',
    ],
    Dinner: [
      'Malai Dum Aloo, Chole, Gulab Jamun, Rice, Roti, Pickle, Cucumber, Onion, Lemon, Chilli, Milk + Bournvita/Coffee',
      'Lauki Kofta, Dal Makhani, Rice, Vanilla Ice Cream, Roti, Pickle, Cucumber, Onion, Lemon, Chilli, Milk + Bournvita/Coffee',
      'Chana Dal, Aloo-Gajar-Matar, Jeera Rice, Curd, Roti, Pickle, Cucumber, Onion, Lemon, Chilli, Milk + Coffee/Bournvita',
      'Sambar, Aloo Beans, Rice, Butterscotch Ice Cream, Roti, Pickle, Cucumber, Onion, Lemon, Chilli, Milk + Coffee/Bournvita',
      'Pav Bhaji, Kheer, Pickle, Cucumber, Onion, Lemon, Chilli',
      'Tahri, Boondi Raita, Chutney, Papad, Pickle, Cucumber, Onion, Lemon, Chilli, Milk + Coffee/Bournvita',
      'Paneer Bhurji, Mix Dal, Rice, Chocolate Ice Cream, Roti, Pickle, Cucumber, Onion, Lemon, Chilli, Milk + Coffee/Bournvita',
    ],
  },
}

export const messNotes = [
  'Jeera Rice, Tomato Rice and Lemon Rice — salt should be added separately.',
  'Paneer used is Amul Paneer.',
  'Saturday & Sunday breakfast timing: 8:00 AM – 10:00 AM.',
]

export const messRules = [
  'Waste of food is strongly discouraged. Take only what you can eat.',
  'Students are required to maintain cleanliness of the dining area.',
  'Mess dishes and utensils must not be taken to rooms. If food needs to be carried for a valid reason, prior information to the mess staff is required.',
  'Any grievance related to food quality should be reported to the Mess Committee.',
  'Mess dues must be cleared by the specified deadline each semester.',
  'Guests must be accompanied by a resident and prior intimation given to the mess office.',
]

// ─── COMMITTEE DATA ───────────────────────────────────────────────────────────

export const administration = [
  {
    id: 1,
    name: 'Dr. Pragya Dwivedi',
    position: 'Warden',
    department: 'Department of Computer Science & Engineering, MNNIT Allahabad',
    contact: '7839007927',
    image: null,
  },
  {
    id: 2,
    name: 'Dr. Kanika Saxena',
    position: 'Warden',
    department: 'Department of Civil Engineering, MNNIT Allahabad',
    contact: '7839007929',
    image: null,
  },
  {
    id: 3,
    name: 'Dr. Asmita Mishra',
    position: 'Warden',
    department: 'Department of Chemical Engineering, MNNIT Allahabad',
    contact: '7566744227',
    image: null,
  },
  {
    id: 4,
    name: '[Caretaker Name]',
    position: 'Hostel Caretaker',
    department: 'Hostel Administration',
    contact: '[Contact Number]',
    image: null,
  },
]

export const hostelCommittee = [
  { id: 1, name: 'Pakhi Garg',      position: 'Hostel President',          year: '',  responsibilities: 'Overall hostel coordination, student welfare and administration liaison' },
  { id: 2, name: 'Trisha Pandey',   position: 'Mess Secretary',             year: '',  responsibilities: 'Mess committee liaison, food quality and hygiene monitoring' },
  { id: 3, name: 'Krishna Singh',   position: 'Hostel Secretary – Civil',   year: '',  responsibilities: 'Civil and infrastructure complaints, coordination with maintenance staff' },
  { id: 4, name: 'Shrishti Rai',    position: 'Mess Manager',               year: '',  responsibilities: 'Day-to-day management of mess operations and quality standards' },
  { id: 5, name: 'Anjali Raj',      position: 'Mess Secretary',             year: '',  responsibilities: 'Collecting student feedback and coordinating with mess staff' },
  { id: 6, name: 'Vansshiekaa',     position: 'Anti-Ragging Coordinator',   year: '',  responsibilities: 'Ensuring a safe, ragging-free environment and handling related concerns' },
]

export const messCommittee = [
  { id: 1, name: 'Trisha Pandey',  position: 'Mess Secretary',  year: '', responsibilities: 'Overall coordination of mess services, quality and student communication' },
  { id: 2, name: 'Shrishti Rai',   position: 'Mess Manager',    year: '', responsibilities: 'Day-to-day management of mess operations and quality standards' },
  { id: 3, name: 'Anjali Raj',     position: 'Mess Secretary',  year: '', responsibilities: 'Collecting student feedback, hygiene monitoring and coordinating with mess staff' },
]

// ─── NOTICES ─────────────────────────────────────────────────────────────────

export const noticesData = [
  {
    id: 1,
    title: 'Mess Timing Change – Winter Schedule',
    date: '2026-08-10',
    category: 'Mess',
    important: true,
    description: 'With effect from 15 August 2026, breakfast timings will be revised to 7:30 AM – 9:30 AM for the winter season. Students are advised to note the revised timings.',
  },
  {
    id: 2,
    title: 'Hostel Gate Closing Time – Revised',
    date: '2026-08-08',
    category: 'Hostel',
    important: true,
    description: 'The hostel gate closing time has been revised to 10:00 PM with effect from 10 August 2026. Students must ensure they are within the hostel premises before this time.',
  },
  {
    id: 3,
    title: 'Annual Hostel Day Celebrations – Volunteers Required',
    date: '2026-08-07',
    category: 'Events',
    important: false,
    description: 'The Hostel Committee invites volunteers for the upcoming Annual Hostel Day celebrations scheduled for 20 August 2026. Interested students may contact the Cultural Secretary.',
  },
  {
    id: 4,
    title: 'Plumbing Maintenance – Block B – 12 August 2026',
    date: '2026-08-06',
    category: 'Maintenance',
    important: false,
    description: 'Scheduled plumbing maintenance will be carried out in Block B on 12 August 2026 between 10:00 AM – 2:00 PM. Water supply may be disrupted during this period.',
  },
  {
    id: 5,
    title: 'Hostel Fee Payment Deadline – August 2026',
    date: '2026-08-04',
    category: 'Administration',
    important: true,
    description: 'Students are reminded that the last date for payment of hostel fees for the current semester is 20 August 2026. Late payments will attract a fine as per institute rules.',
  },
  {
    id: 6,
    title: 'Indoor Games Room – New Equipment Added',
    date: '2026-08-02',
    category: 'General',
    important: false,
    description: 'New carrom boards and a table tennis table have been added to the common room. Students may use these between 6:00 PM – 9:00 PM on all days.',
  },
  {
    id: 7,
    title: 'Fire Safety Drill – 15 August 2026',
    date: '2026-08-01',
    category: 'Important',
    important: true,
    description: 'A mandatory fire safety drill will be conducted on 15 August 2026 at 4:00 PM. All residents are required to participate. Emergency exit locations will be briefed.',
  },
]

// ─── FACILITIES ────────────────────────────────────────────────────────────────

export const facilitiesData = [
  {
    category: 'Accommodation',
    items: [
      { name: 'Triple Occupancy Rooms',    icon: 'Bed',        description: '117 triple-occupancy rooms, each with study desks, wardrobes and cots for all three residents.' },
      { name: 'Hall Rooms (4-Seater)',     icon: 'Users',      description: '5 hall rooms accommodating 4 students each, designed for shared residential living.' },
      { name: 'Common Halls',             icon: 'Layout',     description: '4 common halls spread across the building for relaxation, community gatherings and shared activities.' },
    ],
  },
  {
    category: 'Academic',
    items: [
      { name: 'Study Area',               icon: 'BookMarked', description: 'Dedicated study areas available for residents to focus on academic work.' },
      { name: 'Wi-Fi / Internet',         icon: 'Wifi',       description: 'High-speed Wi-Fi internet connectivity available throughout the hostel premises.' },
    ],
  },
  {
    category: 'Recreation',
    items: [
      { name: 'Common Room',                icon: 'Tv2',            description: 'Common room with television and comfortable seating for recreation and leisure.' },
      { name: 'Indoor Games',               icon: 'Gamepad2',       description: 'Indoor games including carrom, chess, table tennis, and other indoor activities.' },
      { name: 'Outdoor / Sports Area',      icon: 'Dumbbell',       description: 'Outdoor sports facilities shared with the institute campus for physical activities.' },
    ],
  },
  {
    category: 'Essential Services',
    items: [
      { name: 'Laundry Services',           icon: 'Wind',           description: 'Washing machines available for residents on each floor with defined time slots.' },
      { name: 'RO Drinking Water',          icon: 'Droplets',       description: 'Purified RO drinking water available 24 hours on every floor of the hostel.' },
      { name: 'Power Backup',               icon: 'Zap',            description: 'Uninterrupted power backup available for essential areas and rooms.' },
      { name: 'Housekeeping',               icon: 'Sparkles',       description: 'Regular professional housekeeping for rooms, corridors, and common areas.' },
      { name: 'Maintenance',                icon: 'Wrench',         description: 'Dedicated hostel maintenance staff for prompt resolution of repair requests.' },
    ],
  },
  {
    category: 'Safety',
    items: [
      { name: '24/7 Security',              icon: 'ShieldCheck',    description: 'Round-the-clock security personnel at the hostel gate and premises.' },
      { name: 'CCTV Surveillance',          icon: 'Camera',         description: 'CCTV cameras installed at strategic locations throughout the hostel.' },
      { name: 'Fire Safety',                icon: 'Flame',          description: 'Fire extinguishers, smoke detectors, and clearly marked emergency exits.' },
      { name: 'Emergency Support',          icon: 'HeartPulse',     description: 'Emergency response protocol and 24-hour helpline for resident safety.' },
    ],
  },
]

// ─── FAQ ─────────────────────────────────────────────────────────────────────

export const faqData = [
  {
    question: 'How can I report a hostel maintenance issue?',
    answer: 'Visit the Complaints section of this website and fill in the Complaint Form. Select the appropriate category (e.g. Civil, Electrical, Plumbing) and provide a description. You will receive a unique Complaint ID to track the progress of your complaint.',
  },
  {
    question: "Where can I find today's mess menu?",
    answer: "Navigate to the Mess section using the top navigation bar or the Quick Access cards on the Home page. The Mess page displays today's menu for all four meals along with timings.",
  },
  {
    question: 'How can I track my complaint?',
    answer: 'Go to the Complaints page and scroll to the "Track Your Complaint" section. Enter your Complaint ID (format: DJGH-YYYY-XXXXX) to view the current status and history of your complaint.',
  },
  {
    question: 'Who should I contact in an emergency?',
    answer: 'In case of emergency, please contact the Security Desk immediately. Emergency contact numbers for security, medical assistance, and fire emergency are listed on the Contact page. The warden can also be reached through the hostel office.',
  },
  {
    question: 'How can I contact the hostel committee?',
    answer: "The hostel committee can be reached through the hostel office, or by visiting the Committee page on this website where member details are listed. You can also reach out during the committee's designated open hours.",
  },
  {
    question: 'Where can I find hostel notices?',
    answer: 'All official hostel notices are posted on the Notice Board page of this website. Important notices are highlighted for quick visibility. You can also filter notices by category.',
  },
  {
    question: 'How can I submit mess feedback?',
    answer: 'Navigate to the Mess page and scroll to the Feedback section. You can rate the food and submit written feedback. The Mess Committee reviews all feedback regularly.',
  },
  {
    question: 'What are the hostel timings?',
    answer: 'Hostel gate closing time is 10:00 PM. Mess timings are: Breakfast 7:00–9:00 AM, Lunch 12:00–2:00 PM, Snacks 5:00–6:00 PM, Dinner 7:30–9:30 PM. Detailed timings are available on the Hostel Rules page.',
  },
  {
    question: 'Where can I find the hostel rules?',
    answer: 'All hostel rules are listed on the Hostel Rules page accessible via the footer. Rules are organised by category including General Conduct, Timings, Visitors, Safety, and more.',
  },
  {
    question: 'Is there internet / Wi-Fi available in the hostel?',
    answer: 'Yes, high-speed Wi-Fi is available throughout the hostel premises. For connectivity issues, file a complaint under the Internet/Wi-Fi category in the Complaints section.',
  },
]

// ─── HOSTEL LIFE / EVENTS ─────────────────────────────────────────────────────

export const hostelEvents = [
  {
    id: 1,
    title: 'Annual Hostel Day 2025',
    date: 'October 15, 2025',
    category: 'Events',
    description: 'A day of celebration featuring performances, competitions, and community bonding.',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80',
  },
  {
    id: 2,
    title: 'Diwali Celebrations',
    date: 'October 20, 2025',
    category: 'Festivals',
    description: 'Vibrant Diwali decorations, rangoli competition, and celebrations within the hostel community.',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80',
  },
  {
    id: 3,
    title: 'Inter-Hostel Sports Meet',
    date: 'September 12, 2025',
    category: 'Sports',
    description: 'Annual inter-hostel sports competition with participation in badminton, volleyball, and athletics.',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80',
  },
  {
    id: 4,
    title: 'Independence Day Celebration',
    date: 'August 15, 2025',
    category: 'Cultural',
    description: 'Flag hoisting and cultural programme organised by the hostel committee to mark Independence Day.',
    image: 'https://images.unsplash.com/photo-1582711012124-a56cf82307a0?w=600&q=80',
  },
  {
    id: 5,
    title: 'Community Cleanliness Drive',
    date: 'November 5, 2025',
    category: 'Community',
    description: 'A Swachh Bharat initiative by hostel residents to clean and maintain the hostel surroundings.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
  },
  {
    id: 6,
    title: 'Farewell & New Year Celebration',
    date: 'December 28, 2025',
    category: 'Events',
    description: 'End-of-year celebration with farewell for final-year students and welcome for the new academic batch.',
    image: 'https://images.unsplash.com/photo-1528605105345-5344ea20e269?w=600&q=80',
  },
]

// ─── HOSTEL RULES ─────────────────────────────────────────────────────────────

export const hostelRules = [
  {
    heading: 'General Conduct',
    items: [
      { title: 'Discipline and Decorum', content: 'All residents must maintain proper discipline and decorum within the hostel premises. Any behaviour disturbing to other residents will be viewed seriously.' },
      { title: 'Prohibition of Ragging', content: 'Ragging in any form is strictly prohibited and is punishable under institute rules and the law. Any instance of ragging should be reported immediately to the warden.' },
      { title: 'Noise Levels', content: 'Silence must be maintained after 10:00 PM. Loud music, shouting or any disturbance is not permitted in the hostel during night hours.' },
      { title: 'Alcohol and Substances', content: 'Consumption of alcohol, tobacco or any prohibited substance within the hostel premises is strictly forbidden and will result in disciplinary action.' },
    ],
  },
  {
    heading: 'Timings',
    items: [
      { title: 'Gate Closing Time', content: 'The hostel gate closes at 10:00 PM. All residents must return to the hostel before this time. Late entry must be sanctioned by the warden in advance.' },
      { title: 'Mess Timings', content: 'Breakfast: 7:00–9:00 AM | Lunch: 12:00–2:00 PM | Snacks: 5:00–6:00 PM | Dinner: 7:30–9:30 PM. Entry will not be permitted after the closing time of each meal.' },
      { title: 'Lights Off', content: 'Lights in common areas are switched off at 11:00 PM. Residents are encouraged to be in their rooms by this time for adequate rest.' },
    ],
  },
  {
    heading: 'Visitors',
    items: [
      { title: 'Guest Entry', content: 'Visitors are permitted in the designated guest area only. No visitors are permitted inside the residential floors without prior permission from the warden.' },
      { title: 'Male Visitors', content: 'Male visitors (including family members) are permitted only in the common visitor area and not inside the hostel building.' },
      { title: 'Visitor Timings', content: 'Visiting hours are 9:00 AM to 8:00 PM. Visitors must sign the visitor register at the security desk.' },
    ],
  },
  {
    heading: 'Cleanliness & Hygiene',
    items: [
      { title: 'Room Cleanliness', content: 'Residents are responsible for keeping their rooms clean. Housekeeping staff will clean rooms as per schedule, but personal belongings must be managed by the resident.' },
      { title: 'Waste Disposal', content: 'Waste must be disposed of in the designated dustbins. Littering in corridors, common areas or outside windows is strictly prohibited.' },
      { title: 'Washroom Maintenance', content: 'Residents must ensure that washrooms are used hygienically. Any plumbing issue must be reported immediately to the hostel maintenance staff.' },
    ],
  },
  {
    heading: 'Safety & Security',
    items: [
      { title: 'Security Compliance', content: 'All residents must comply with instructions from security personnel. Entry without a valid hostel ID card is not permitted.' },
      { title: 'Emergency Procedures', content: 'In case of fire or any other emergency, follow the designated emergency exit routes. Do not use elevators during a fire emergency.' },
      { title: 'Suspicious Activity', content: 'Any suspicious activity or unknown persons on the hostel premises must be reported immediately to the security desk or warden.' },
    ],
  },
  {
    heading: 'Electrical Appliances',
    items: [
      { title: 'Permitted Appliances', content: 'Only appliances listed in the hostel guidelines are permitted in rooms. Using high-wattage appliances like electric heaters and irons is subject to hostel policy.' },
      { title: 'Energy Conservation', content: 'Fans, lights and other electrical appliances must be switched off when leaving the room. Wastage of electricity is strongly discouraged.' },
    ],
  },
  {
    heading: 'Common Areas',
    items: [
      { title: 'Common Room Usage', content: 'The common room is for shared use of all residents. It must be kept clean and orderly after use.' },
      { title: 'Reading Room', content: 'The reading room is a silent zone. Mobile phones must be on silent mode. Eating is not permitted inside the reading room.' },
    ],
  },
]

// ─── EMERGENCY CONTACTS ───────────────────────────────────────────────────────

export const emergencyContacts = [
  {
    id: 1,
    title: 'Hostel Security',
    number: '[Security Desk Number]',
    description: 'For immediate security-related concerns, access issues, or any on-campus emergency.',
    icon: 'Shield',
    color: 'navy',
    available: '24 / 7',
  },
  {
    id: 2,
    title: 'Medical Emergency',
    number: '[Institute Medical Centre]',
    description: 'MNNIT Medical Centre for health emergencies. Ambulance service also available.',
    icon: 'HeartPulse',
    color: 'red',
    available: '24 / 7',
  },
  {
    id: 3,
    title: 'Fire Emergency',
    number: '101',
    description: 'In the event of fire, evacuate the premises immediately and call the fire emergency number.',
    icon: 'Flame',
    color: 'orange',
    available: '24 / 7',
  },
  {
    id: 4,
    title: 'Warden (Dr. Pragya Dwivedi)',
    number: '7839007927',
    description: 'Contact the Warden for urgent hostel administration matters.',
    icon: 'User',
    color: 'gold',
    available: 'Office Hours',
  },
  {
    id: 5,
    title: 'Hostel Caretaker',
    number: '[Caretaker Contact]',
    description: 'For day-to-day hostel maintenance issues, room-related concerns, and hostel operations.',
    icon: 'Wrench',
    color: 'teal',
    available: '8 AM – 8 PM',
  },
  {
    id: 6,
    title: 'Police Emergency',
    number: '100',
    description: 'National police emergency helpline. Use only for genuine law-and-order emergencies.',
    icon: 'Phone',
    color: 'gray',
    available: '24 / 7',
  },
]
