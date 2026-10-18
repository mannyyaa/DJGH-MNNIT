import React, { useState } from 'react'
import { Clock, Star, Send, ChevronDown, CheckCircle, AlertCircle, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import SectionLabel from '../components/SectionLabel'
import { todayMenu as staticTodayMenu, weeklyMenu as staticWeeklyMenu, messTimings, messRules, messCommittee, messNotes } from '../data/siteData'
import { useToast } from '../context/ToastContext'
import { useAdmin } from '../context/AdminContext'

const mealMeta = {
  breakfast: { label: 'Breakfast',      emoji: '🌅', color: 'bg-orange-50 border-orange-100', header: 'bg-orange-500' },
  lunch:     { label: 'Lunch',          emoji: '☀️', color: 'bg-yellow-50 border-yellow-100', header: 'bg-yellow-500' },
  snacks:    { label: 'Evening Snacks', emoji: '🫖', color: 'bg-teal-50 border-teal-100',     header: 'bg-teal-500' },
  dinner:    { label: 'Dinner',         emoji: '🌙', color: 'bg-indigo-50 border-indigo-100', header: 'bg-indigo-600' },
}

function StarRating({ value, onChange, label }) {
  return (
    <div>
      <p className="text-xs font-medium text-gray-700 mb-1">{label}</p>
      <div className="flex gap-1">
        {[1,2,3,4,5].map(n => (
          <button
            key={n}
            type="button"
            onClick={() => onChange(n)}
            className="focus:outline-none"
            aria-label={`${n} star`}
          >
            <Star
              size={20}
              className={n <= value ? 'text-[#c9952a] fill-[#c9952a]' : 'text-gray-300'}
            />
          </button>
        ))}
      </div>
    </div>
  )
}

const feedbackCategories = [
  'Food Quality', 'Taste', 'Hygiene', 'Variety', 'Timeliness', 'Overall Experience'
]

export default function Mess() {
  const { addToast } = useToast()
  const { addMessFeedback, messMenu } = useAdmin()

  // Derive today's menu: prefer API data, fall back to static
  const dayIdx = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1  // 0=Mon … 6=Sun
  const todayMenu = React.useMemo(() => {
    if (messMenu?.menu) {
      const day = messMenu.menu[String(dayIdx)] || {}
      const t   = messMenu.timings || {}
      return {
        breakfast: { time: t.breakfast || staticTodayMenu.breakfast.time, items: (day.breakfast || '').split(',').map(s => s.trim()).filter(Boolean) || staticTodayMenu.breakfast.items },
        lunch:     { time: t.lunch     || staticTodayMenu.lunch.time,     items: (day.lunch     || '').split(',').map(s => s.trim()).filter(Boolean) || staticTodayMenu.lunch.items },
        snacks:    { time: t.snacks    || staticTodayMenu.snacks.time,    items: (day.snacks    || '').split(',').map(s => s.trim()).filter(Boolean) || staticTodayMenu.snacks.items },
        dinner:    { time: t.dinner    || staticTodayMenu.dinner.time,    items: (day.dinner    || '').split(',').map(s => s.trim()).filter(Boolean) || staticTodayMenu.dinner.items },
      }
    }
    return staticTodayMenu
  }, [messMenu, dayIdx])

  // Weekly menu from API or static fallback
  const weeklyMenu = React.useMemo(() => {
    if (messMenu?.menu) {
      const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      const result = { days, meals: { Breakfast: [], Lunch: [], 'Eve. Snacks': [], Dinner: [] } }
      for (let i = 0; i < 7; i++) {
        const day = messMenu.menu[String(i)] || {}
        result.meals.Breakfast.push(day.breakfast   || staticWeeklyMenu.meals.Breakfast[i]    || '')
        result.meals.Lunch.push(day.lunch            || staticWeeklyMenu.meals.Lunch[i]        || '')
        result.meals['Eve. Snacks'].push(day.snacks  || staticWeeklyMenu.meals['Eve. Snacks']?.[i] || '')
        result.meals.Dinner.push(day.dinner          || staticWeeklyMenu.meals.Dinner[i]       || '')
      }
      return result
    }
    return staticWeeklyMenu
  }, [messMenu])

  // Feedback state
  const [ratings, setRatings]     = useState({})
  const [feedback, setFeedback]   = useState('')
  const [category, setCategory]   = useState('Overall Experience')
  const [name, setName]           = useState('')
  const [room, setRoom]           = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      await addMessFeedback({
        category,
        ratings: {
          foodQuality: ratings['Food Quality'] || 0,
        taste:       ratings['Taste'] || 0,
        hygiene:     ratings['Hygiene'] || 0,
        variety:     ratings['Variety'] || 0,
        timeliness:  ratings['Timeliness'] || 0,
        overall:     ratings['Overall'] || 0,
      },
      comment: feedback,
      name,
      room,
    })
      setSubmitted(true)
      addToast('Thank you! Your feedback has been submitted to the Mess Committee.', 'success')
      setTimeout(() => setSubmitted(false), 4000)
    } catch (err) {
      addToast(err.message || 'Could not submit feedback. Please try again.', 'error')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="page-fade">
      <PageHeader
        breadcrumb="Diamond Jubilee Girls Hostel"
        title="The Hostel Mess"
        subtitle="Good food, healthy routines and a shared table."
      />

      {/* ── TODAY'S MENU ─────────────────────────────────────────────────── */}
      <section className="py-10 sm:py-16 bg-[#faf7f0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <SectionLabel text="Today's Menu" />
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0b1540]">
              What's being served today
            </h2>
            <p className="text-gray-500 text-sm mt-2">
              {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {Object.entries(todayMenu).map(([key, data]) => {
              const meta = mealMeta[key]
              return (
                <div key={key} className={`rounded-2xl border overflow-hidden shadow-sm ${meta.color}`}>
                  <div className={`${meta.header} px-5 py-4`}>
                    <div className="flex items-center justify-between">
                      <h3 className="text-white font-bold text-base">{meta.label}</h3>
                      <span className="text-2xl">{meta.emoji}</span>
                    </div>
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <Clock size={12} className="text-white/70" />
                      <span className="text-white/80 text-[11px]">{data.time}</span>
                    </div>
                  </div>
                  <ul className="px-5 py-4 space-y-1.5">
                    {data.items.map(item => (
                      <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="text-[#c9952a] font-bold mt-0.5 text-xs">·</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── WEEKLY MENU ─────────────────────────────────────────────────── */}
      <section className="py-10 sm:py-16 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <SectionLabel text="Weekly Schedule" />
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0b1540]">
              Weekly Mess Menu
            </h2>
          </div>

          <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
            <table className="w-full min-w-[700px] text-sm">
              <thead>
                <tr className="bg-[#0b1540]">
                  <th className="text-left text-white font-semibold px-4 py-3 text-xs uppercase tracking-wide w-28">Meal</th>
                  {weeklyMenu.days.map(day => (
                    <th key={day} className="text-center text-white font-semibold px-3 py-3 text-xs uppercase tracking-wide">
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {Object.entries(weeklyMenu.meals).map(([meal, items], ri) => (
                  <tr key={meal} className={ri % 2 === 0 ? 'bg-white' : 'bg-gray-50/60'}>
                    <td className="px-4 py-3 font-semibold text-[#0b1540] text-xs uppercase tracking-wide whitespace-nowrap">
                      {meal}
                    </td>
                    {items.map((item, ci) => (
                      <td key={ci} className="px-3 py-3 text-gray-600 text-xs text-center leading-snug">
                        {item}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400 mt-3 text-center">
            * Menu is subject to change. Final menu is displayed at the mess notice board.
          </p>

          {/* Notes */}
          <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl px-5 py-4">
            <p className="text-xs font-bold uppercase tracking-widest text-amber-700 mb-2">Notes</p>
            <ul className="space-y-1.5">
              {messNotes.map((note, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-amber-800">
                  <span className="text-amber-500 font-bold mt-0.5">·</span>
                  {note}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── TIMINGS & RULES ─────────────────────────────────────────────── */}
      <section className="py-10 sm:py-16 bg-[#faf7f0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

            {/* Timings */}
            <div>
              <SectionLabel text="Timings" />
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#0b1540] mb-6">
                Mess Timings
              </h2>
              <div className="space-y-3">
                {messTimings.map(({ meal, time }) => (
                  <div
                    key={meal}
                    className="flex items-center justify-between bg-white border border-gray-100 rounded-xl px-5 py-4 shadow-sm"
                  >
                    <span className="font-medium text-[#0b1540]">{meal}</span>
                    <div className="flex items-center gap-2 text-[#1a2f6e] font-semibold text-sm">
                      <Clock size={14} className="text-[#c9952a]" />
                      {time}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 bg-blue-50 border border-blue-100 rounded-xl px-5 py-4">
                <p className="text-blue-700 text-sm font-medium">
                  Students are encouraged to arrive within the serving window. Saturday & Sunday breakfast timing: <strong>8:00 AM – 10:00 AM</strong>.
                </p>
              </div>
            </div>

            {/* Rules */}
            <div>
              <SectionLabel text="Rules" />
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#0b1540] mb-6">
                Mess Rules
              </h2>
              <ul className="space-y-2.5">
                {messRules.map((rule, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                    <span className="w-5 h-5 rounded-full bg-[#0b1540]/8 text-[#0b1540] text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    {rule}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── MESS COMMITTEE ──────────────────────────────────────────────── */}
      <section className="py-10 sm:py-16 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <SectionLabel text="Mess Committee" />
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0b1540]">
              Your Mess Committee
            </h2>
            <p className="text-gray-500 text-sm mt-2 max-w-xl mx-auto">
              The Mess Committee is a team of elected student representatives who work to ensure
              the quality, hygiene and overall dining experience at the hostel mess.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
            {messCommittee.map(member => (
              <div key={member.id} className="bg-[#faf7f0] rounded-xl border border-gray-100 p-5 text-center">
                <div className="w-16 h-16 rounded-full bg-[#0b1540]/10 flex items-center justify-center text-[#0b1540] font-bold text-xl mx-auto mb-3 font-serif">
                  {member.name.replace('[','').charAt(0)}
                </div>
                <p className="font-semibold text-[#0b1540] text-sm">{member.name}</p>
                <p className="text-[#c9952a] text-xs font-medium mt-0.5">{member.position}</p>
                <p className="text-gray-400 text-[11px] mt-0.5">{member.year}</p>
                <p className="text-gray-500 text-[11px] mt-2 leading-snug">{member.responsibilities}</p>
              </div>
            ))}
          </div>

          {/* Role of committee */}
          <div className="bg-[#0b1540] rounded-2xl p-6 sm:p-8">
            <h3 className="text-white font-serif font-bold text-lg mb-4">
              Role of the Mess Committee
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                'Collecting student feedback on food quality and service',
                'Communicating food-related concerns to mess staff and administration',
                'Coordinating with mess contractor for menu planning',
                'Reviewing menu suggestions from residents',
                'Promoting hygiene and cleanliness standards in the mess',
                'Representing student concerns at hostel administration meetings',
              ].map((role, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <CheckCircle size={14} className="text-[#c9952a] shrink-0 mt-0.5" />
                  <p className="text-gray-300 text-sm">{role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FEEDBACK ────────────────────────────────────────────────────── */}
      <section className="py-10 sm:py-16 bg-[#faf7f0] border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <SectionLabel text="Feedback" />
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0b1540]">
              Share Your Mess Feedback
            </h2>
            <p className="text-gray-500 text-sm mt-2">
              Your feedback helps us improve the dining experience.
            </p>
          </div>

          {/* Complaint shortcut banner */}
          <div className="mb-6 bg-[#0b1540] rounded-xl px-5 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-start gap-3">
              <AlertCircle size={18} className="text-[#c9952a] shrink-0 mt-0.5" />
              <div>
                <p className="text-white text-sm font-semibold">Have a mess complaint?</p>
                <p className="text-gray-400 text-xs mt-0.5">For specific issues with food, hygiene or service, file a formal complaint.</p>
              </div>
            </div>
            <Link
              to="/complaints"
              state={{ category: 'mess' }}
              className="shrink-0 inline-flex items-center gap-1.5 bg-[#c9952a] hover:bg-[#a87620] text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              File a Mess Complaint <ArrowRight size={13} />
            </Link>
          </div>

          {submitted ? (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
              <CheckCircle size={40} className="text-green-500 mx-auto mb-3" />
              <h3 className="text-green-800 font-semibold text-lg mb-1">Feedback Submitted</h3>
              <p className="text-green-600 text-sm">Thank you! The Mess Committee will review your feedback.</p>
            </div>
          ) : (
            <form
              onSubmit={handleFeedbackSubmit}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8 space-y-6"
            >
              {/* Name + Room */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#0b1540] mb-1.5">
                    Name <span className="text-gray-400 font-normal">(optional)</span>
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Your name"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#0b1540]/20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#0b1540] mb-1.5">
                    Room Number <span className="text-gray-400 font-normal">(optional)</span>
                  </label>
                  <input
                    type="text"
                    value={room}
                    onChange={e => setRoom(e.target.value)}
                    placeholder="e.g. 204"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#0b1540]/20"
                  />
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-[#0b1540] mb-1.5">
                  Feedback Category
                </label>
                <div className="relative">
                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 appearance-none focus:outline-none focus:ring-2 focus:ring-[#0b1540]/30 bg-white pr-8"
                  >
                    {feedbackCategories.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-3.5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Ratings */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
                {['Food Quality', 'Taste', 'Hygiene', 'Variety', 'Timeliness', 'Overall'].map(cat => (
                  <StarRating
                    key={cat}
                    label={cat}
                    value={ratings[cat] || 0}
                    onChange={val => setRatings(r => ({ ...r, [cat]: val }))}
                  />
                ))}
              </div>

              {/* Written Feedback */}
              <div>
                <label className="block text-sm font-medium text-[#0b1540] mb-1.5">
                  Written Feedback <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <textarea
                  value={feedback}
                  onChange={e => setFeedback(e.target.value)}
                  placeholder="Share your thoughts, suggestions, or concerns about the mess..."
                  rows={4}
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#0b1540]/30 resize-none"
                />
              </div>

              <div className="bg-gray-50 border border-gray-100 rounded-lg px-4 py-3">
                <p className="text-xs text-gray-500">
                  Name and room number are optional and will not be displayed publicly. Feedback is reviewed by the Mess Committee only.
                </p>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full flex items-center justify-center gap-2 bg-[#0b1540] hover:bg-[#1a2f6e] text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-60"
              >
                <Send size={15} />
                {submitting ? 'Submitting…' : 'Submit Feedback'}
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  )
}
