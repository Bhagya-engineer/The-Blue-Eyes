import React, { useState, useEffect } from 'react';
import { reviewsData } from '../data';
import { ReviewItem } from '../types';
import { Star, MessageSquareCode, Sparkles, User, FileEdit, CheckCheck } from 'lucide-react';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { collection, doc, getDocs, setDoc } from 'firebase/firestore';

export default function ReviewsSection() {
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [activeTab, setActiveTab] = useState<number>(0);

  // New review state
  const [name, setName] = useState('');
  const [role, setRole] = useState('Bride');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Load reviews + append Firestore & local storage additions
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'reviews'));
        const fbReviews: ReviewItem[] = [];
        querySnapshot.forEach((doc) => {
          fbReviews.push({ id: doc.id, ...doc.data() } as ReviewItem);
        });
        setReviews([...reviewsData, ...fbReviews]);
      } catch (error) {
        console.warn("Failed to load reviews from Firestore, falling back to local:", error);
        const savedReviews = JSON.parse(localStorage.getItem('bee_reviews') || '[]');
        setReviews([...reviewsData, ...savedReviews]);
      }
    };
    fetchReviews();
  }, []);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !comment) {
      alert('Please fill out your name and sweet remarks.');
      return;
    }

    const initials = name
      .split(' ')
      .map((word) => word[0])
      .join('')
      .substring(0, 2)
      .toUpperCase() || 'BE';

    const docId = `rev-dyn-${Date.now()}`;
    const newReview: ReviewItem = {
      id: docId,
      name: name,
      role: role,
      rating: rating,
      comment: comment,
      date: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }),
      avatar: initials
    };

    const submitToFirestore = async () => {
      try {
        await setDoc(doc(db, 'reviews', docId), {
          name: newReview.name,
          role: newReview.role,
          rating: newReview.rating,
          comment: newReview.comment,
          date: newReview.date,
          avatar: newReview.avatar
        });

        // Also keep local fallback
        const saved = JSON.parse(localStorage.getItem('bee_reviews') || '[]');
        saved.push(newReview);
        localStorage.setItem('bee_reviews', JSON.stringify(saved));

        // Re-read or append in state
        setReviews((prev) => {
          if (prev.some(r => r.id === docId)) return prev;
          return [...prev, newReview];
        });
      } catch (error) {
        console.error("Failed to submit review to Firestore:", error);
        // Fallback to storing in browser local
        const saved = JSON.parse(localStorage.getItem('bee_reviews') || '[]');
        saved.push(newReview);
        localStorage.setItem('bee_reviews', JSON.stringify(saved));
        setReviews([...reviewsData, ...saved]);
        handleFirestoreError(error, OperationType.CREATE, `reviews/${docId}`);
      }
    };
    
    submitToFirestore();

    // Clear inputs & transition
    setName('');
    setComment('');
    setSubmitSuccess(true);
    setTimeout(() => {
      setSubmitSuccess(false);
      setShowAddForm(false);
    }, 2000);
  };


  return (
    <section id="reviews" className="py-20 bg-[#FAF7F4] relative border-b border-brand-gold/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title layout */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-brand-gold">
            Voices of Romance & Celebrations
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-navy mt-3 leading-tight">
            Loved By Families
          </h2>
          <div className="w-16 h-1 bg-brand-gold mx-auto my-5 rounded-full" />
          <p className="text-slate-600 text-sm sm:text-base">
            Every celebration leaves a lifelong trace in the hearts of family elders, brides, and grooms. Read authentic testimonies from our distinguished patrons.
          </p>
        </div>

        {/* Primary Slider Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Main Review Display (8 columns) */}
          <div className="lg:col-span-8 flex flex-col justify-between bg-brand-white border border-brand-gold/15 rounded-2xl p-6 sm:p-10 shadow-lg relative min-h-80">
            <div className="absolute top-6 right-6 font-mono text-8xl text-brand-gold/10 font-bold select-none leading-none">
              “
            </div>

            {reviews.length > 0 && (
              <div className="space-y-6">
                {/* Star rating design */}
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star
                      key={idx}
                      className={`w-5 h-5 ${
                        idx < reviews[activeTab].rating
                          ? 'fill-brand-gold text-brand-gold'
                          : 'text-slate-200'
                      }`}
                    />
                  ))}
                </div>

                {/* Comment quote text */}
                <p className="font-serif text-[17px] sm:text-lg italic text-[#222] leading-relaxed">
                  "{reviews[activeTab].comment}"
                </p>

                {/* Speaker metadata */}
                <div className="flex items-center gap-4.5 pt-4">
                  {/* Initials profile */}
                  <div className="w-12 h-12 rounded-full bg-brand-navy text-brand-gold flex items-center justify-center font-bold text-sm tracking-widest border border-brand-gold/45 shadow">
                    {reviews[activeTab].avatar}
                  </div>
                  <div>
                    <h4 className="font-sans font-bold text-brand-navy text-sm sm:text-base">
                      {reviews[activeTab].name}
                    </h4>
                    <span className="text-[10px] sm:text-xs font-mono font-bold text-[#888] uppercase tracking-wider block">
                      {reviews[activeTab].role} • {reviews[activeTab].date}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Slider navigators indicator */}
            <div className="flex items-center justify-between mt-10 pt-4 border-t border-slate-100 flex-wrap gap-4">
              <div className="flex gap-1.5 overflow-x-auto max-w-[200px] sm:max-w-none py-1">
                {reviews.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTab(index)}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      activeTab === index ? 'w-8 bg-brand-navy' : 'w-2.5 bg-slate-200 hover:bg-brand-gold'
                    }`}
                    aria-label={`Show slide ${index + 1}`}
                  />
                ))}
              </div>

              {/* Add review trigger button */}
              <button
                id="review-trigger-form-btn"
                onClick={() => setShowAddForm(!showAddForm)}
                className="px-4 py-2 bg-brand-navy text-brand-gold hover:bg-brand-gold hover:text-brand-navy text-[10px] font-mono font-bold tracking-wider uppercase rounded-full border border-brand-gold/30 flex items-center gap-1.5 transition-all shadow cursor-pointer"
              >
                <FileEdit className="w-3.5 h-3.5" />
                {showAddForm ? 'COLLAPSE FORM' : 'ADD YOUR REMARK'}
              </button>
            </div>
          </div>

          {/* Quick core stat visual helper (4 columns) */}
          <div className="lg:col-span-4 bg-brand-navy text-brand-white rounded-2xl p-6 sm:p-8 flex flex-col justify-around border border-brand-gold/20 shadow-xl">
            <div className="space-y-1">
              <span className="text-[9px] font-mono tracking-widest text-brand-gold uppercase font-bold block">
                Patron Metrics
              </span>
              <p className="font-serif text-2xl font-bold tracking-wide">
                Excellence Standardized
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 my-6">
              <div className="border border-brand-white/10 rounded-xl p-4 text-center bg-brand-white/5">
                <span className="text-3xl font-serif text-brand-gold font-bold">5.0</span>
                <p className="text-[10px] font-mono opacity-80 mt-1 uppercase">Rating Score</p>
              </div>
              <div className="border border-brand-white/10 rounded-xl p-4 text-center bg-brand-white/5">
                <span className="text-3xl font-serif text-brand-gold font-bold">120+</span>
                <p className="text-[10px] font-mono opacity-80 mt-1 uppercase">Events Done</p>
              </div>
            </div>

            <div className="text-[11px] leading-relaxed text-brand-ivory/70 space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-brand-gold rounded-full" />
                <span>100% verified matrimonial events.</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-brand-gold rounded-full" />
                <span>Awarded Best Regional Decorator 2025.</span>
              </div>
            </div>
          </div>

        </div>

        {/* Floating review write form if expanded */}
        {showAddForm && (
          <div className="mt-10 max-w-4xl mx-auto bg-brand-white border border-brand-gold/25 rounded-2xl p-6 sm:p-8 shadow-xl animate-in fade-in duration-300">
            {submitSuccess ? (
              <div className="text-center py-6">
                <div className="w-12 h-12 bg-[#2E7D32]/10 border border-[#2E7D32] text-[#2E7D32] rounded-full mx-auto flex items-center justify-center">
                  <CheckCheck className="w-6 h-6 animate-bounce" />
                </div>
                <h4 className="font-sans font-bold text-brand-navy text-base mt-2">Remark Submitted with Grace</h4>
                <p className="text-xs text-slate-500 mt-1">Thank you for sharing your celebration joy with us.</p>
              </div>
            ) : (
              <form onSubmit={handleReviewSubmit} className="space-y-5">
                <h3 className="font-serif text-lg font-bold text-brand-navy flex items-center gap-2 border-b border-slate-100 pb-3">
                  <MessageSquareCode className="w-5 h-5 text-brand-gold" /> Write Your Celebration Story
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Name */}
                  <div>
                    <label className="text-[10px] font-mono font-bold text-brand-navy uppercase tracking-wider block mb-1.5">
                      Your Names
                    </label>
                    <input
                      type="text"
                      id="review-name-input"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="E.g., Vikram & Swati"
                      className="w-full text-xs p-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-gold"
                    />
                  </div>

                  {/* Role Type */}
                  <div>
                    <label className="text-[10px] font-mono font-bold text-brand-navy uppercase tracking-wider block mb-1.5">
                      Your Celebration Role
                    </label>
                    <select
                      id="review-role-select"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="w-full text-xs p-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-gold"
                    >
                      <option value="Bride">Bride</option>
                      <option value="Groom">Groom</option>
                      <option value="Father of Bride">Father of Bride</option>
                      <option value="Mother of Groom">Mother of Groom</option>
                      <option value="Matrimonial Patron">Matrimonial Patron</option>
                      <option value="Corporate Host">Corporate Host</option>
                    </select>
                  </div>

                  {/* Rating Score Selection */}
                  <div>
                    <label className="text-[10px] font-mono font-bold text-brand-navy uppercase tracking-wider block mb-1.5">
                      Excellence Rating ({rating} Stars)
                    </label>
                    <div className="flex gap-1.5 h-10 items-center justify-around bg-slate-50/70 border border-slate-200/80 rounded-xl px-2">
                      {[1, 2, 3, 4, 5].map((stars) => (
                        <button
                          key={stars}
                          type="button"
                          id={`review-stars-${stars}`}
                          onClick={() => setRating(stars)}
                          className="p-1 focus:outline-none transition-transform hover:scale-125"
                        >
                          <Star
                            className={`w-5 h-5 ${
                              stars <= rating ? 'fill-brand-gold text-brand-gold' : 'text-slate-300'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Comment box */}
                <div>
                  <label className="text-[10px] font-mono font-bold text-brand-navy uppercase tracking-wider block mb-1.5">
                    Your Testimonial / Story Context
                  </label>
                  <textarea
                    id="review-comment-input"
                    rows={3}
                    required
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Describe how The Blue Eye Events staff coordinated, decorated, or catered. Your feedback keeps our design team inspired."
                    className="w-full text-xs p-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-gold"
                  />
                </div>

                <button
                  type="submit"
                  id="review-submit-submit-btn"
                  className="w-full py-3.5 bg-brand-navy hover:bg-brand-gold text-brand-ivory hover:text-brand-navy font-mono text-xs font-bold tracking-widest uppercase rounded-xl transition-all border border-brand-gold/15 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 animate-pulse text-brand-gold" />
                  SUBMIT MATRIMONIAL REVIEW
                </button>
              </form>
            )}
          </div>
        )}

      </div>
    </section>
  );
}
