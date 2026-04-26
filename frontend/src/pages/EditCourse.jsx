// frontend/src/pages/EditCourse.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

export default function EditCourse() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lessonInput, setLessonInput] = useState({ title: '', videoUrl: '', pdfUrl: '' });

  useEffect(() => {
    const stored = localStorage.getItem('instructorCourses');
    const courses = stored ? JSON.parse(stored) : [];
    const course = courses.find(c => c.id == id);
    if (course) {
      setFormData(course);
      setLoading(false);
    } else {
      navigate('/instructor/dashboard');
    }
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedData = {
      ...formData,
      tags: formData.tags.split(',').map(t => t.trim()),
      price: formData.isFree ? 0 : parseFloat(formData.price),
      status: 'pending', // requires re-approval after edit
    };
    const stored = localStorage.getItem('instructorCourses');
    const courses = stored ? JSON.parse(stored) : [];
    const index = courses.findIndex(c => c.id == id);
    if (index !== -1) courses[index] = updatedData;
    localStorage.setItem('instructorCourses', JSON.stringify(courses));
    alert('Course updated. Pending admin approval.');
    navigate('/instructor/dashboard');
  };

  if (loading) return <Layout><div className="text-center py-20">Loading...</div></Layout>;
  if (!formData) return null;

  return (
    <Layout>
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold" style={{ color: 'var(--text-h)' }}>Edit Course</h1>
        <div className="p-6 rounded-xl" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Same fields as CreateCourse, but values bound to formData */}
            <div><label>Title</label><input type="text" name="title" value={formData.title} onChange={handleChange} className="w-full p-2 rounded-lg border" required /></div>
            <div><label>Description</label><textarea name="description" rows="4" value={formData.description} onChange={handleChange} className="w-full p-2 rounded-lg border"></textarea></div>
            <div><label>Category</label><select name="category" value={formData.category} onChange={handleChange} className="w-full p-2 rounded-lg border"><option>Web Development</option><option>Data Science</option></select></div>
            <div><label>Tags (comma)</label><input type="text" name="tags" value={formData.tags.join(',')} onChange={handleChange} className="w-full p-2 rounded-lg border" /></div>
            <div className="flex gap-4">
              <label><input type="checkbox" name="isFree" checked={formData.isFree} onChange={handleChange} /> Free</label>
              {!formData.isFree && <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price" className="p-2 rounded border" />}
            </div>
            <div><label>Thumbnail URL</label><input type="url" name="thumbnail" value={formData.thumbnail} onChange={handleChange} className="w-full p-2 rounded-lg border" /></div>
            <h2 className="text-xl font-semibold">Lessons</h2>
            <div className="space-y-2">
              <input type="text" placeholder="Lesson title" value={lessonInput.title} onChange={e => setLessonInput({...lessonInput, title: e.target.value})} className="w-full p-2 rounded-lg border" />
              <input type="url" placeholder="Video URL" value={lessonInput.videoUrl} onChange={e => setLessonInput({...lessonInput, videoUrl: e.target.value})} className="w-full p-2 rounded-lg border" />
              <button type="button" onClick={addLesson} className="px-3 py-1 rounded" style={{ background: 'var(--accent)', color: 'white' }}>Add Lesson</button>
            </div>
            {formData.lessons.map(lesson => (
              <div key={lesson.id} className="flex justify-between items-center p-2 rounded" style={{ background: 'var(--code-bg)' }}>
                <span>{lesson.title}</span>
                <button type="button" onClick={() => removeLesson(lesson.id)} className="text-red-500">Remove</button>
              </div>
            ))}
            <div><h3>Assignment</h3><input type="text" placeholder="Title" value={formData.assignment.title} onChange={e => setFormData({...formData, assignment: {...formData.assignment, title: e.target.value}})} className="w-full p-2 border rounded mb-2" /></div>
            <button type="submit" className="px-4 py-2 rounded" style={{ background: 'var(--accent)', color: 'white' }}>Update Course</button>
          </form>
        </div>
      </div>
    </Layout>
  );
}