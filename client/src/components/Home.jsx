import React from 'react';
import { Link } from 'react-router-dom';
import CompanyImage from './../assets/Business_meeting.jpg';
import { red } from '@mui/material/colors';
import ReviewCard from './ReviewCard';
import Footer from './Footer';

const Home = () => {
  return (
    <>
      <div>
        <nav className="bg-sky-600 p-4 flex justify-between items-center">
          <div className="flex items-center">
          <Link to="/"><h1 className="text-2xl font-bold text-white">NEXUSCycle</h1></Link>
          </div>
          <div className="flex">
            <Link to="#" className="text-white px-4 py-2">Learning Resource</Link>
            <Link to="/login" className="text-white px-4 py-2">Login</Link>
            <Link to="/login" className="text-white px-4 py-2">Register</Link>
          </div>
        </nav>

        <div className="flex items-center">
          <div className="flex-shrink-0 w-2/3 relative overflow-hidden rounded-md">
            <img
              src={CompanyImage}
              alt="Company Meeting"
              className="w-full h-full object-cover"
              style={{ borderRadius: '0 0.625rem 0.625rem 0' }}
            />
          </div>
          <div className="ml-8 w-1/3">
            <h1 className="text-6xl font-bold text-gray-800 mb-4">Welcome To</h1>
            <h2 className="text-4xl font-bold text-gray-800 mb-4">NEXUSCycle</h2>
            <p className="text-lg text-gray-600">
            In today's fast-paced tech industry, efficient Product Life Cycle Management (PLM) is crucial for companies to stay ahead of the curve. We invite you to design and implement an innovative PLM system that can adapt to the dynamic nature of modern product development processes.
            </p>
          </div>
        </div>

        {/* Adding Material-UI Review Cards */}
        <div className='mt-8'>
  <h1 className="text-4xl font-bold text-center mb-8">Reviews</h1>
</div>
        <div className="flex justify-around mx-10 mt-8">
  <div className="group flex-grow m-1.5">
    <ReviewCard
      title="Revolutionizing Project Management"
      subheader="February 15, 2023"
      content="Our experience with the project management platform from NEXUSCycle has been truly transformative. The centralized dashboard provides real-time insights into ongoing projects, making collaboration seamless and boosting productivity."
    />
  </div>

  <div className="group flex-grow m-1.5">
    <ReviewCard
      title="Efficient Agile Development"
      subheader="March 10, 2023"
      content="NEXUSCycle Agile-friendly module has revolutionized our development process. Sprint planning, backlog management, and burndown charts have significantly enhanced our agility. The platform is a game-changer for any team following iterative and incremental development methodologies."
    />
  </div>

  <div className="group flex-grow m-1.5">
    <ReviewCard
      title="Empowering Collaboration"
      subheader="April 5, 2023"
      content="The collaborative tools provided by NEXUSCycle have transformed the way our teams work together. Features like chat functionality, document sharing, and collaborative editing have made communication seamless across product managers, engineers, designers, and other stakeholders."
    />
  </div>

  <div className="group flex-grow m-1.5">
    <ReviewCard
      title="Streamlined Workflows"
      subheader="May 20, 2023"
      content="NEXUSCycle platform has significantly streamlined our workflows. The Unified Product Dashboard provides a centralized hub for real-time visibility into ongoing and upcoming product life cycles. Customizable widgets tailored to our team's needs have made monitoring relevant data a breeze."
    />
  </div>

  <div className="group flex-grow m-1.5">
    <ReviewCard
      title="Innovative Customer Feedback Integration"
      subheader="June 12, 2023"
      content="We are impressed with the innovative customer feedback integration in NEXUSCycle PLM system. The direct gathering of insights and opinions from end-users has added immense value to our product development process. The tools for analyzing feedback data and integrating it into our workflow have made the customer feedback loop seamless."
    />
  </div>
</div>

      </div>
      <Footer/>
    </>
  );
};

export default Home;
