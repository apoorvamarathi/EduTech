// // frontend/src/pages/Courses.jsx
// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import Layout from '../components/Layout';

// export default function Courses() {
//   const [courses, setCourses] = useState([]);
//   const [search, setSearch] = useState('');
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     setTimeout(() => {
//       setCourses([
//         { id: 1, title: 'React - The Complete Guide', price: 49, instructor: 'John Doe', thumbnail: 'https://via.placeholder.com/300x150' },
//         { id: 2, title: 'Node.js API Mastery', price: 59, instructor: 'Jane Smith', thumbnail: 'https://via.placeholder.com/300x150' },
//         { id: 3, title: 'Tailwind CSS from Zero', price: 29, instructor: 'Mike Lee', thumbnail: 'https://via.placeholder.com/300x150' },
//       ]);
//       setLoading(false);
//     }, 500);
//   }, []);

//   const filtered = courses.filter(c => c.title.toLowerCase().includes(search.toLowerCase()));

//   return (
//     <Layout>
//       <div className="space-y-6">
//         <div className="flex justify-between items-center">
//           <h1 className="text-3xl font-bold" style={{ color: 'var(--text-h)' }}>All Courses</h1>
//           <input type="text" placeholder="Search courses..." value={search} onChange={e => setSearch(e.target.value)} className="px-4 py-2 rounded-xl border" style={{ background: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--text-h)' }} />
//         </div>
//         {loading ? <div className="text-center py-10">Loading...</div> : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {filtered.map(course => (
//               <div key={course.id} className="rounded-xl overflow-hidden" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
//                 <img src={course.thumbnail} alt={course.title} className="w-full h-40 object-cover" />
//                 <div className="p-4">
//                   <h3 className="text-xl font-semibold" style={{ color: 'var(--text-h)' }}>{course.title}</h3>
//                   <p className="text-sm" style={{ color: 'var(--text)' }}>By {course.instructor}</p>
//                   <div className="flex justify-between items-center mt-3">
//                     <span className="text-lg font-bold" style={{ color: 'var(--accent)' }}>${course.price}</span>
//                     <Link to={`/course/${course.id}`} className="px-3 py-1 rounded-lg text-sm" style={{ background: 'var(--accent)', color: 'white' }}>View Details</Link>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </Layout>
//   );
// }


// frontend/src/pages/Courses.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import api from '../utils/api';

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data } = await api.get('/courses');
        setCourses(data);
      } catch (err) {
        console.error('Failed to fetch courses', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const filtered = courses.filter(c => c.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-3xl font-bold" style={{ color: 'var(--text-h)' }}>All Courses</h1>
          <input 
            type="text" 
            placeholder="Search courses..." 
            value={search} 
            onChange={e => setSearch(e.target.value)} 
            className="px-4 py-2 rounded-xl border w-full sm:w-64"
            style={{ background: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--text-h)' }} 
          />
        </div>

        {loading ? (
          <div className="text-center py-10">Loading courses...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(course => (
              <div key={course._id} className="rounded-xl overflow-hidden transition hover:shadow-lg" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
                <img 
                  src={course.thumbnail || 'https://via.placeholder.com/300x150?text=Course'} 
                  alt={course.title} 
                  className="w-full h-40 object-cover"
                  onError={(e) => { e.target.src = 'https://picsum.photos/id/20/300/150'; }}
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold" style={{ color: 'var(--text-h)' }}>{course.title}</h3>
                  <p className="text-sm mt-1" style={{ color: 'var(--text)' }}>By {course.instructor?.name || 'Instructor'}</p>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-lg font-bold" style={{ color: 'var(--accent)' }}>${course.price}</span>
                    <Link 
                      to={`/course/${course._id}`} 
                      className="px-4 py-2 rounded-lg text-sm font-medium transition hover:opacity-80"
                      style={{ background: 'var(--accent)', color: 'white' }}
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}