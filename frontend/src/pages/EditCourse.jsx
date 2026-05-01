// frontend/src/pages/EditCourse.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import api from '../utils/api';

export default function EditCourse() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lessonInput, setLessonInput] = useState({ title: '', videoUrl: '', pdfUrl: '' });

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const { data } = await api.get(`/courses/${id}`);
        setFormData({
          ...data,
          tags: data.tags || [],
          lessons: data.lessons || [],
          assignment: data.assignment || { title: '', description: '', dueDate: '' },
          isFree: data.price === 0
        });
      } catch (err) {
        console.error('Failed to fetch course', err);
        navigate('/instructor');
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
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
  const removeLesson = (lessonId) => {
    setFormData(prev => ({ ...prev, lessons: prev.lessons.filter(l => l.id !== lessonId) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedData = {
      ...formData,
      tags: Array.isArray(formData.tags) ? formData.tags : formData.tags.split(',').map(t => t.trim()),
      price: formData.isFree ? 0 : parseFloat(formData.price),
    };
    
    try {
      await api.put(`/courses/${id}`, updatedData);
      alert('Course updated successfully!');
      navigate('/instructor');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update course');
    }
  };

  if (loading) return <Layout><div className="text-center py-20">Loading...</div></Layout>;
  if (!formData) return null;

  return (
    <Layout>
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold" style={{ color: 'var(--text-h)' }}>Edit Course</h1>
        <div className="p-6 rounded-xl" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div><label>Title</label><input type="text" name="title" value={formData.title} onChange={handleChange} className="w-full p-2 rounded-lg border" required /></div>
            <div><label>Description</label><textarea name="description" rows="4" value={formData.description} onChange={handleChange} className="w-full p-2 rounded-lg border"></textarea></div>
            <div>
              <label>Category</label>
              <select name="category" value={formData.category} onChange={handleChange} className="w-full p-2 rounded-lg border" required>
                <option value="">Select category</option>
                <option value="Web Development">Web Development</option>
                <option value="Data Science">Data Science</option>
                <option value="Mobile Apps">Mobile Apps</option>
                <option value="Design">Design</option>
              </select>
            </div>
            <div><label>Tags (comma)</label><input type="text" name="tags" value={Array.isArray(formData.tags) ? formData.tags.join(',') : formData.tags} onChange={handleChange} className="w-full p-2 rounded-lg border" /></div>
            <div className="flex gap-4">
              <label><input type="checkbox" name="isFree" checked={formData.isFree} onChange={handleChange} /> Free</label>
              {!formData.isFree && <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price" className="p-2 rounded border" />}
            </div>
            <div><label>Thumbnail URL</label><input type="url" name="thumbnail" value={formData.thumbnail} onChange={handleChange} className="w-full p-2 rounded-lg border" /></div>
            
            <h2 className="text-xl font-semibold">Lessons (Requires API integration)</h2>
            <div className="space-y-2">
              <input type="text" placeholder="Lesson title" value={lessonInput.title} onChange={e => setLessonInput({...lessonInput, title: e.target.value})} className="w-full p-2 rounded-lg border" />
              <input type="url" placeholder="Video URL" value={lessonInput.videoUrl} onChange={e => setLessonInput({...lessonInput, videoUrl: e.target.value})} className="w-full p-2 rounded-lg border" />
              <button type="button" onClick={addLesson} className="px-3 py-1 rounded" style={{ background: 'var(--accent)', color: 'white' }}>Add Lesson</button>
            </div>
            {formData.lessons.map((lesson, idx) => (
              <div key={lesson._id || idx} className="flex justify-between items-center p-2 rounded" style={{ background: 'var(--code-bg)' }}>
                <span>{lesson.title}</span>
                <button type="button" onClick={() => removeLesson(lesson.id || lesson._id)} className="text-red-500">Remove</button>
              </div>
            ))}
            
            <button type="submit" className="px-4 py-2 rounded font-semibold" style={{ background: 'var(--accent)', color: 'white' }}>Update Course</button>
          </form>
        </div>
      </div>
    </Layout>
  );
}