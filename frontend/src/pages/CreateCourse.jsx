// frontend/src/pages/CreateCourse.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

export default function CreateCourse() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    isFree: false,
    tags: '',
    lessons: [],
    assignment: { title: '', description: '', dueDate: '' },
    thumbnail: null,
  });
  const [lessonInput, setLessonInput] = useState({ title: '', videoUrl: '', pdfUrl: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const addLesson = () => {
    if (lessonInput.title) {
      setFormData(prev => ({
        ...prev,
        lessons: [...prev.lessons, { ...lessonInput, id: Date.now() }]
      }));
      setLessonInput({ title: '', videoUrl: '', pdfUrl: '' });
    }
  };
  const removeLesson = (id) => {
    setFormData(prev => ({ ...prev, lessons: prev.lessons.filter(l => l.id !== id) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const courseData = {
      ...formData,
      id: Date.now(),
      status: 'pending', // requires admin approval
      instructorId: JSON.parse(localStorage.getItem('userInfo'))._id,
      createdAt: new Date().toISOString(),
      tags: formData.tags.split(',').map(t => t.trim()),
      price: formData.isFree ? 0 : parseFloat(formData.price),
    };
    // Save to localStorage (replace with API)
    const existing = localStorage.getItem('instructorCourses');
    const courses = existing ? JSON.parse(existing) : [];
    courses.push(courseData);
    localStorage.setItem('instructorCourses', JSON.stringify(courses));
    setTimeout(() => {
      alert('Course submitted for admin approval!');
      navigate('/instructor/dashboard');
    }, 1000);
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold" style={{ color: 'var(--text-h)' }}>Create New Course</h1>
        <div className="p-6 rounded-xl" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
          <form onSubmit={handleSubmit} className="space-y-6">
            {step === 1 && (
              <>
                <div>
                  <label className="block font-medium mb-1">Course Title</label>
                  <input type="text" name="title" value={formData.title} onChange={handleChange} required className="w-full p-2 rounded-lg border" style={{ background: 'var(--bg)', borderColor: 'var(--border)' }} />
                </div>
                <div>
                  <label className="block font-medium mb-1">Description</label>
                  <textarea name="description" rows="4" value={formData.description} onChange={handleChange} required className="w-full p-2 rounded-lg border"></textarea>
                </div>
                <div>
                  <label className="block font-medium mb-1">Category</label>
                  <select name="category" value={formData.category} onChange={handleChange} required className="w-full p-2 rounded-lg border">
                    <option value="">Select category</option>
                    <option value="Web Development">Web Development</option>
                    <option value="Data Science">Data Science</option>
                    <option value="Mobile Apps">Mobile Apps</option>
                    <option value="Design">Design</option>
                  </select>
                </div>
                <div>
                  <label className="block font-medium mb-1">Tags (comma separated)</label>
                  <input type="text" name="tags" value={formData.tags} onChange={handleChange} placeholder="e.g., React, Node, MongoDB" className="w-full p-2 rounded-lg border" />
                </div>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" name="isFree" checked={formData.isFree} onChange={handleChange} />
                    Free Course
                  </label>
                  {!formData.isFree && (
                    <div className="flex-1">
                      <label>Price (₹)</label>
                      <input type="number" name="price" value={formData.price} onChange={handleChange} className="w-full p-2 rounded-lg border" required={!formData.isFree} />
                    </div>
                  )}
                </div>
                <div>
                  <label className="block font-medium mb-1">Thumbnail (image URL)</label>
                  <input type="url" name="thumbnail" value={formData.thumbnail} onChange={handleChange} placeholder="https://..." className="w-full p-2 rounded-lg border" />
                </div>
                <button type="button" onClick={() => setStep(2)} className="px-4 py-2 rounded-lg" style={{ background: 'var(--accent)', color: 'white' }}>Next: Lessons →</button>
              </>
            )}
            {step === 2 && (
              <>
                <h2 className="text-xl font-semibold">Lessons & Content</h2>
                <div className="space-y-2">
                  <input type="text" placeholder="Lesson title" value={lessonInput.title} onChange={e => setLessonInput({...lessonInput, title: e.target.value})} className="w-full p-2 rounded-lg border" />
                  <input type="url" placeholder="Video URL (YouTube/Vimeo)" value={lessonInput.videoUrl} onChange={e => setLessonInput({...lessonInput, videoUrl: e.target.value})} className="w-full p-2 rounded-lg border" />
                  <input type="url" placeholder="PDF URL (optional)" value={lessonInput.pdfUrl} onChange={e => setLessonInput({...lessonInput, pdfUrl: e.target.value})} className="w-full p-2 rounded-lg border" />
                  <button type="button" onClick={addLesson} className="px-3 py-1 rounded-lg text-sm" style={{ background: 'var(--accent)', color: 'white' }}>Add Lesson</button>
                </div>
                <div className="space-y-2">
                  {formData.lessons.map(lesson => (
                    <div key={lesson.id} className="flex justify-between items-center p-2 rounded" style={{ background: 'var(--code-bg)' }}>
                      <span>{lesson.title}</span>
                      <button type="button" onClick={() => removeLesson(lesson.id)} className="text-red-500">Remove</button>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <h3 className="font-semibold">Assignment (Optional)</h3>
                  <input type="text" placeholder="Assignment title" value={formData.assignment.title} onChange={e => setFormData({...formData, assignment: {...formData.assignment, title: e.target.value}})} className="w-full p-2 rounded-lg border mb-2" />
                  <textarea placeholder="Description" rows="2" value={formData.assignment.description} onChange={e => setFormData({...formData, assignment: {...formData.assignment, description: e.target.value}})} className="w-full p-2 rounded-lg border mb-2"></textarea>
                  <input type="date" value={formData.assignment.dueDate} onChange={e => setFormData({...formData, assignment: {...formData.assignment, dueDate: e.target.value}})} className="w-full p-2 rounded-lg border" />
                </div>
                <div className="flex gap-3">
                  <button type="button" onClick={() => setStep(1)} className="px-4 py-2 rounded-lg border">Back</button>
                  <button type="submit" disabled={loading} className="px-4 py-2 rounded-lg" style={{ background: 'var(--accent)', color: 'white' }}>{loading ? 'Submitting...' : 'Submit for Approval'}</button>
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    </Layout>
  );
}