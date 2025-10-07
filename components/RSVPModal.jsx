'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';


export default function RSVPModal({ isOpen, onClose }) {
  const [name, setName] = useState('');
  const [attending, setAttending] = useState(null);
  const [guests, setGuests] = useState(1);
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !attending) return;

    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/rsvp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          attending,
          guests: attending === 'yes' ? guests : 0,
          message
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit RSVP');
      }

      setIsSubmitted(true);
      setTimeout(() => {
        onClose();
        setIsSubmitted(false);
        resetForm();
      }, 3000);
    } catch (error) {
      console.error('Error submitting RSVP:', error);
      alert('حدث خطأ في إرسال التأكيد. يرجى المحاولة مرة أخرى.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setName('');
    setAttending(null);
    setGuests(1);
    setMessage('');
  };

  // Create guest options array - FIXED
  const guestOptions = [1, 2, 3, 4, 5, 6,7,8,9,10,11,12,13];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-gradient-to-br from-white to-pink-50 rounded-2xl sm:rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto border border-pink-200"
            dir="rtl"
          >
            {isSubmitted ? (
              <div className="p-6 sm:p-8 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg"
                >
                  <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2 sm:mb-3 font-arabic bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">
                  شكراً جزيلاً!
                </h3>
                <p className="text-gray-600 text-base sm:text-lg font-arabic">تم تسجيل ردكم بنجاح</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-4 sm:p-6 md:p-8">
                <div className="text-center mb-4 sm:mb-6">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2 sm:mb-3 font-arabic bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                    هل ستشاركنا فرحتنا؟
                  </h2>
                  <p className="text-gray-600 text-base sm:text-lg font-arabic">نرجو التأكد قبل ١٠ يونيو ٢٠٢٥</p>
                </div>

                <div className="space-y-4 sm:space-y-6">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 sm:mb-3 font-arabic text-right">
                      الاسم الكامل *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3 sm:px-4 py-3 sm:py-4 border-2 border-gray-200 rounded-xl sm:rounded-2xl focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition-all duration-200 text-right font-arabic text-base sm:text-lg bg-white/80"
                      placeholder="أدخل الاسم الكامل"
                      dir="rtl"
                    />
                  </div>


                  {/* Attendance */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3 sm:mb-4 font-arabic text-right">
                      هل ستشاركنا الحفل؟ *
                    </label>
                    <div className="grid grid-cols-2 gap-2 sm:gap-3">
                      <button
                        type="button"
                        onClick={() => setAttending('yes')}
                        className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl border-2 transition-all duration-300 font-arabic transform hover:scale-105 ${attending === 'yes' ? 'border-green-500 bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 shadow-lg' : 'border-gray-200 bg-white hover:border-green-300 hover:shadow-md'}`}
                      >
                        <div className="text-lg sm:text-xl font-semibold">🎉 نعم!</div>
                        <div className="text-xs sm:text-sm text-gray-600 mt-1">سأحضر</div>
                      </button>
                      <button
                        type="button"
                        onClick={() => setAttending('no')}
                        className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl border-2 transition-all duration-300 font-arabic transform hover:scale-105 ${attending === 'no' ? 'border-red-500 bg-gradient-to-r from-red-50 to-pink-50 text-red-700 shadow-lg' : 'border-gray-200 bg-white hover:border-red-300 hover:shadow-md'}`}
                      >
                        <div className="text-lg sm:text-xl font-semibold">😔 لا</div>
                        <div className="text-xs sm:text-sm text-gray-600 mt-1">لن أتمكن</div>
                      </button>
                    </div>
                  </div>

                  {/* Number of Guests */}
                  {attending === 'yes' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 sm:mb-3 font-arabic text-right">
                        عدد الضيوف
                      </label>
                      <select
                        value={guests}
                        onChange={(e) => setGuests(Number(e.target.value))}
                        className="w-full px-3 sm:px-4 py-3 sm:py-4 border-2 border-gray-200 rounded-xl sm:rounded-2xl focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition-all duration-200 font-arabic text-right bg-white/80"
                        dir="rtl"
                      >
                        {guestOptions.map(num => (
                          <option key={num} value={num}>
                            {num} {(num === 1 || num >10) ? 'شخص' : 'أشخاص'}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 sm:mb-3 font-arabic text-right">
                      رسالة للعروسين
                    </label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={3}
                      className="w-full px-3 sm:px-4 py-3 sm:py-4 border-2 border-gray-200 rounded-xl sm:rounded-2xl focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition-all duration-200 resize-none font-arabic text-right bg-white/80"
                      placeholder="شاركنا فرحتك أو أرسل تمنياتك..."
                      dir="rtl"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={!name || !attending || isSubmitting}
                    className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-lg sm:text-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 font-arabic"
                  >
                    {isSubmitting ? 'جاري الإرسال...' : 'تأكيد الحضور'}
                  </button>

                  <button
                    type="button"
                    onClick={onClose}
                    className="w-full text-gray-500 py-2 sm:py-3 rounded-xl sm:rounded-2xl font-medium hover:text-gray-700 hover:bg-gray-50 transition-all duration-200 font-arabic border border-gray-200"
                  >
                    ربما لاحقاً
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}