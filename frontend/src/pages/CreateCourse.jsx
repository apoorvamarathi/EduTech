


// frontend/src/pages/CreateCourse.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import api from '../utils/api';

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
    thumbnail: '',
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const courseData = {
      ...formData,
      tags: formData.tags.split(',').map(t => t.trim()),
      price: formData.isFree ? 0 : parseFloat(formData.price || 0),
    };
    
    try {
      await api.post('/courses', courseData);
      alert('Course created successfully!');
      navigate('/instructor');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to create course');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Create New Course</h1>
          <p className="text-indigo-300 mt-1">Share your knowledge with the world</p>
        </div>
        
        <div className="p-6 rounded-xl bg-[#1E293B]/80 backdrop-blur-sm border border-indigo-500/20">
          <form onSubmit={handleSubmit} className="space-y-6">
            {step === 1 && (
              <>
                <div>
                  <label className="block font-medium mb-1 text-white">Course Title</label>
                  <input type="text" name="title" value={formData.title} onChange={handleChange} required 
                    className="w-full p-2 rounded-lg border border-indigo-500/30 bg-[#0F172A] text-white focus:outline-none focus:border-indigo-500" 
                    placeholder="e.g., Mastering React Development"
                  />
                </div>
                <div>
                  <label className="block font-medium mb-1 text-white">Description</label>
                  <textarea name="description" rows="4" value={formData.description} onChange={handleChange} required 
                    className="w-full p-2 rounded-lg border border-indigo-500/30 bg-[#0F172A] text-white focus:outline-none focus:border-indigo-500"
                    placeholder="What will students learn in this course?"
                  ></textarea>
                </div>
                <div>
                  <label className="block font-medium mb-1 text-white">Category</label>
                  <select name="category" value={formData.category} onChange={handleChange} required 
                    className="w-full p-2 rounded-lg border border-indigo-500/30 bg-[#0F172A] text-white focus:outline-none focus:border-indigo-500">
                    <option value="">Select category</option>
                    <option value="Web Development">🌐 Web Development</option>
                    <option value="Data Science">📊 Data Science</option>
                    <option value="Mobile Apps">📱 Mobile Apps</option>
                    <option value="Design">🎨 Design</option>
                  </select>
                </div>
                <div>
                  <label className="block font-medium mb-1 text-white">Tags (comma separated)</label>
                  <input type="text" name="tags" value={formData.tags} onChange={handleChange} 
                    placeholder="e.g., React, Node, MongoDB" 
                    className="w-full p-2 rounded-lg border border-indigo-500/30 bg-[#0F172A] text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 text-white">
                    <input type="checkbox" name="isFree" checked={formData.isFree} onChange={handleChange} className="accent-indigo-500" />
                    Free Course
                  </label>
                  {!formData.isFree && (
                    <div className="flex-1">
                      <label className="text-white">Price (₹)</label>
                      <input type="number" name="price" value={formData.price} onChange={handleChange} 
                        className="w-full p-2 rounded-lg border border-indigo-500/30 bg-[#0F172A] text-white" 
                        required={!formData.isFree} 
                        placeholder="499"
                      />
                    </div>
                  )}
                </div>
                <div>
                  <label className="block font-medium mb-1 text-white">Thumbnail (image URL)</label>
                  <input type="url" name="thumbnail" value={formData.thumbnail} onChange={handleChange} 
                    placeholder="https://..." 
                    className="w-full p-2 rounded-lg border border-indigo-500/30 bg-[#0F172A] text-white"
                  />
                  <p className="text-xs text-gray-400 mt-1">Leave empty for auto-generated image</p>
                </div>
                <button type="button" onClick={() => setStep(2)} 
                  className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition">
                  Next: Lessons →
                </button>
              </>
            )}
            {step === 2 && (
              <>
                <h2 className="text-xl font-semibold text-white">Lessons & Content</h2>
                <div className="space-y-2">
                  <input type="text" placeholder="Lesson title" value={lessonInput.title} 
                    onChange={e => setLessonInput({...lessonInput, title: e.target.value})} 
                    className="w-full p-2 rounded-lg border border-indigo-500/30 bg-[#0F172A] text-white placeholder-gray-400"
                  />
                  <input type="url" placeholder="Video URL (YouTube/Vimeo)" value={lessonInput.videoUrl} 
                    onChange={e => setLessonInput({...lessonInput, videoUrl: e.target.value})} 
                    className="w-full p-2 rounded-lg border border-indigo-500/30 bg-[#0F172A] text-white placeholder-gray-400"
                  />
                  <input type="url" placeholder="PDF URL (optional)" value={lessonInput.pdfUrl} 
                    onChange={e => setLessonInput({...lessonInput, pdfUrl: e.target.value})} 
                    className="w-full p-2 rounded-lg border border-indigo-500/30 bg-[#0F172A] text-white placeholder-gray-400"
                  />
                  <button type="button" onClick={addLesson} 
                    className="px-3 py-1 rounded-lg text-sm bg-indigo-600 text-white hover:bg-indigo-700 transition">
                    + Add Lesson
                  </button>
                </div>
                <div className="space-y-2">
                  {formData.lessons.map(lesson => (
                    <div key={lesson.id} className="flex justify-between items-center p-2 rounded bg-[#0F172A]/50 border border-indigo-500/20">
                      <span className="text-white">📹 {lesson.title}</span>
                      <button type="button" onClick={() => removeLesson(lesson.id)} className="text-red-400 hover:text-red-300">Remove</button>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <h3 className="font-semibold text-white mb-2">Assignment (Optional)</h3>
                  <input type="text" placeholder="Assignment title" value={formData.assignment.title} 
                    onChange={e => setFormData({...formData, assignment: {...formData.assignment, title: e.target.value}})} 
                    className="w-full p-2 rounded-lg border border-indigo-500/30 bg-[#0F172A] text-white mb-2"
                  />
                  <textarea placeholder="Description" rows="2" value={formData.assignment.description} 
                    onChange={e => setFormData({...formData, assignment: {...formData.assignment, description: e.target.value}})} 
                    className="w-full p-2 rounded-lg border border-indigo-500/30 bg-[#0F172A] text-white mb-2"
                  ></textarea>
                  <input type="date" value={formData.assignment.dueDate} 
                    onChange={e => setFormData({...formData, assignment: {...formData.assignment, dueDate: e.target.value}})} 
                    className="w-full p-2 rounded-lg border border-indigo-500/30 bg-[#0F172A] text-white"
                  />
                </div>
                <div className="flex gap-3">
                  <button type="button" onClick={() => setStep(1)} 
                    className="px-4 py-2 rounded-lg border border-indigo-500/30 text-white hover:bg-indigo-500/10 transition">
                    Back
                  </button>
                  <button type="submit" disabled={loading} 
                    className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition disabled:opacity-50">
                    {loading ? 'Submitting...' : 'Submit Course'}
                  </button>
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    </Layout>
  );
}