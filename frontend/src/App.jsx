import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import LandingPage from './pages/LandingPage';
import StudentDashboard from './pages/StudentDashboard';
import { useNavigate } from 'react-router-dom';
import InstructorDashboard from './pages/InstructorDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Courses from './pages/Courses';
import CourseDetails from './pages/CourseDetails';
import Cart from './pages/Cart';
import PaymentSuccess from './pages/PaymentSuccess';
import PaymentFailed from './pages/PaymentFailed';
import OrderHistory from './pages/OrderHistory';
import InstructorEarnings from './pages/InstructorEarnings';
import AdminPayments from './pages/AdminPayments';
import CheckoutPage from './pages/CheckoutPage';
import QuizzesList from './pages/QuizzesList';
import TakeQuiz from './pages/TakeQuiz';
import QuizResult from './pages/QuizResult';
import Leaderboard from './pages/Leaderboard';
import JobsList from './pages/JobsList';
import PostJob from './pages/PostJob';
import ManageApplications from './pages/ManageApplications';
import StudentProfile from './pages/StudentProfile';
import InterviewInvites from './pages/InterviewInvites';
import MyCertificates from './pages/MyCertificates';
import CertificateViewer from './pages/CertificateViewer';
import CourseLearning from './pages/CourseLearning';
import CompanyRegistration from './pages/CompanyRegistration';
import RecruiterDashboard from './pages/RecruiterDashboard';
import CreateCourse from './pages/CreateCourse';
import InstructorCourses from './pages/InstructorDashboard';
import EditCourse from './pages/EditCourse';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
  if (!userInfo.token) return <Navigate to="/login" />;
  if (allowedRoles && !allowedRoles.includes(userInfo.role)) return <Navigate to="/dashboard" />;
  return children;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<LandingPage />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword/>}/>
        <Route path="/reset-password" element={<ResetPassword/>}/>
        <Route path="/layout" element={<LandingPage/>}/>

       <Route path="/dashboard" element={<ProtectedRoute allowedRoles={['student']}><StudentDashboard /></ProtectedRoute>} />
       <Route path="/instructor" element={<ProtectedRoute allowedRoles={['instructor']}><InstructorDashboard /></ProtectedRoute>} />
       <Route path="/admin" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />
       <Route path="/courses" element={<Courses />} />
       <Route path="/course/:id" element={<CourseDetails />} />
       <Route path="/course-learn/:courseId" element={<ProtectedRoute><CourseLearning /></ProtectedRoute>} />
  
    
    
        <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />

        <Route path="/checkout" element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>} />
        <Route path="/payment-success" element={<ProtectedRoute><PaymentSuccess /></ProtectedRoute>} />
        <Route path="/payment-failed" element={<ProtectedRoute><PaymentFailed /></ProtectedRoute>} />
        <Route path="/order-history" element={<ProtectedRoute><OrderHistory /></ProtectedRoute>} />
        <Route path="/instructor/earnings" element={<ProtectedRoute allowedRoles={['instructor']}><InstructorEarnings /></ProtectedRoute>} />
        <Route path="/admin/payments" element={<ProtectedRoute allowedRoles={['admin']}><AdminPayments /></ProtectedRoute>} />

         <Route path="/quizzes" element={<ProtectedRoute><QuizzesList /></ProtectedRoute>} />
          <Route path="/quiz/:id" element={<ProtectedRoute><TakeQuiz /></ProtectedRoute>} />
          <Route path="/quiz-result/:id" element={<ProtectedRoute><QuizResult /></ProtectedRoute>} />
          <Route path="/leaderboard/:quizId" element={<ProtectedRoute><Leaderboard /></ProtectedRoute>} />
          <Route path="/my-certificates" element={<ProtectedRoute><MyCertificates /></ProtectedRoute>} />

          <Route path="/jobs" element={<ProtectedRoute><JobsList /></ProtectedRoute>} />
          <Route path="/post-job" element={<ProtectedRoute allowedRoles={['recruiter']}><PostJob /></ProtectedRoute>} />
          <Route path="/applications/:jobId" element={<ProtectedRoute allowedRoles={['recruiter']}><ManageApplications /></ProtectedRoute>} />
          <Route path="/student-profile" element={<ProtectedRoute allowedRoles={['student']}><StudentProfile /></ProtectedRoute>} />
          <Route path="/interview-invites" element={<ProtectedRoute allowedRoles={['student']}><InterviewInvites /></ProtectedRoute>} />
          <Route path="/my-certificates" element={<ProtectedRoute><MyCertificates /></ProtectedRoute>} />
          <Route path="/certificate/:id" element={<ProtectedRoute><CertificateViewer /></ProtectedRoute>} /> 
          <Route path="/company-register" element={<ProtectedRoute allowedRoles={['recruiter']}><CompanyRegistration /></ProtectedRoute>} />
          <Route path="/recruiter/dashboard" element={<ProtectedRoute allowedRoles={['recruiter']}><RecruiterDashboard /></ProtectedRoute>} />

        <Route path="/create-course" element={<ProtectedRoute allowedRoles={['instructor']}><CreateCourse /></ProtectedRoute>} />
        <Route path="/my-courses" element={<ProtectedRoute allowedRoles={['instructor']}><InstructorCourses /></ProtectedRoute>} />
        <Route path="/edit-course/:id" element={<ProtectedRoute allowedRoles={['instructor']}><EditCourse /></ProtectedRoute>} />
      
      </Routes>
    </BrowserRouter>
  );
}
export default App;

