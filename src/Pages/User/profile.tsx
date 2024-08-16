import React, { useState } from 'react';
import Modal from '../../Components/modal';
const Profile = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
      };
      const handleCloseModal = () => {
        setIsModalOpen(false);
      };
    
    

  return (
    <div>
     <Modal isOpen={isModalOpen} onClose={handleCloseModal} />
      {/* COVER IMAGE SATRT */}
      <div className="relative h-screen w-full">
        <img
          src="\src\Public\bg.jpg"
          alt="Background"
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white px-4">
          <h5 className="text-xl mb-2">Hello, I'm</h5>
          <h2 className="text-5xl font-bold mb-4">Jimmy Anderson</h2>
          <p className="text-center mb-6 max-w-lg">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam.
          </p>
          <a
            href=""
            className="px-6 py-3 border-2 border-white text-white rounded-full hover:bg-white hover:text-black transition duration-300"
          >
            Download CV
          </a>
        </div> */}
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white px-4">
  <h5 className="text-xl mb-2">Hello, I'm</h5>
  <h2 className="text-5xl font-bold mb-4">Jimmy Anderson</h2>
  <p className="text-center mb-6 max-w-lg">
    Lorem ipsum dolor sit amet, consetetur sadipscing elitr sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam.
  </p>
  <div className="flex space-x-6">
    <div className="flex flex-col items-center">
      <span className="text-2xl font-semibold ">244</span>
      <span className="text-sm px-6 py-3 border-2 border-white text-white rounded-full hover:bg-white hover:text-black transition duration-300">Following</span>
    </div>
    <div className="flex flex-col items-center">
      <span className="text-2xl font-semibold">200</span>
      <span className="text-sm px-6 py-3 border-2 border-white text-white rounded-full hover:bg-white hover:text-black transition duration-300">Followers</span>
    </div>
  </div>
</div>
<div className="absolute bottom-4 right-4">
    <button className=" text-white p-2 rounded-full shadow "   onClick={handleOpenModal}>
      <img
        src="\src\Public\edit-editor-pen-pencil-write-icon--4.png"
        alt="Edit"
        className="w-6 h-6"
      />
    </button>
  </div>
      </div>
      
      {/* COBER IMAGE END */}


      {/* ABOUT START */}

      <div id="about_us" className="relative min-h-screen flex items-center justify-center">
  <div className="container mx-auto px-4 relative">
    <div className="text-center mb-8">
      <h2 className="text-3xl font-bold">About Me</h2>
      <p className="text-gray-600 mt-2">The new common language will be more simple and regular than.</p>
    </div>
    <div className="flex flex-col md:flex-row items-center">
      <div className="md:w-3/12 w-full mb-6 md:mb-0">
        <img
          src="\src\Public\about.jpg"
          alt=""
          className="rounded-lg shadow-xl"
        />
      </div>
      <div className="md:w-7/12 w-full md:pl-8">
        <p className="text-gray-700 mb-4 leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sed faucibus mauris, sed porta tellus. Maecenas sit amet sapien mattis, mattis nisi facilisis, dapibus tortor. Morbi non tincidunt lorem. Mauris vehicula diam eu justo tincidunt auctor. Duis euismod non turpis quis varius. Aliquam pulvinar nulla tortor, vitae sollicitudin mauris aliquam sit amet. Vestibulum a dignissim ipsum. Nam egestas, tellus quis vestibulum porttitor, leo elit lacinia nisl, id imperdiet neque dui at mauris.
        </p>
        {/* <div className="flex justify-center mt-6">
          <button className="bg-gray-800 text-white py-2 px-6 rounded-lg shadow hover:bg-gray-600">
            Edit Profile
          </button>
        </div> */}
      </div>
    </div>

    <div className="absolute bottom-4 right-4">
      <a className=" p-2 rounded-full shadow">
        <img
          src="\src\Public\edit-editor-pen-pencil-write-icon--4.png"
          alt="Edit"
          className="w-6 h-6"
        />
      </a>
    </div>
  </div>
</div>


     {/* ABOUT END */}

     {/* <!--*************** My Services Starts Here ***************--> */}

            <section id="services" className="features container-fluid bg-white py-12">
            <div className="container mx-auto">
                <div className="relative  row session-title text-center mb-8">
                <h2 className="text-3xl font-bold">My Education</h2>
                <p className="text-gray-600 mt-2">
                    There are many variations of passages of Lorem Ipsum available, but the majority have suffered
                </p>
                <div className="absolute top-0 right-0">
                <a className="p-2 rounded-full shadow hover:cursor-pointer">
                    <img
                        src="\src\Public\add.png" 
                        alt="Add"
                        className="w-6 h-6"
                    />
                </a>
              </div>
                </div>
                <div className="row feature-row grid grid-cols-1 md:grid-cols-3 gap-6">


                <div className="relative col-md-4">
                <div className="feature-col bg-white p-8 text-center rounded-lg shadow-2xl transition duration-300 hover:shadow-2xl">
                    <i className="far fa-newspaper text-4xl text-blue-500 mb-4"></i>
                    <h4 className="text-xl font-semibold mb-2">Fully Transparent</h4>
                    <p className="text-gray-600">
                    Accurate information of work. Visualization achieved through the board.
                    </p>
                </div>
                <div className="absolute bottom-1 right-7">
                    <a className="p-2 rounded-full shadow">
                    <img
                        src="\src\Public\edit-editor-pen-pencil-write-icon--4.png"
                        alt="Edit"
                        className="w-4 h-4"
                    />
                    </a>
                </div>
                <div className="absolute bottom-1 right-2">
            <a className="p-2 rounded-full shadow ">
            <img
                src="\src\Public\delete.png" 
                alt="Edit"
                className="w-4 h-4"
            />
            </a>
           </div>
                </div>


                <div className="col-md-4 relative ">
                    <div className="feature-col bg-white p-8 text-center rounded-lg shadow-2xl transition duration-300 hover:shadow-2xl">
                    <i className="fas fa-chart-bar text-4xl text-blue-500 mb-4"></i>
                    <h4 className="text-xl font-semibold mb-2">Continuous Improvement</h4>
                    <p className="text-gray-600">
                        Accurate information of work. Visualization achieved through the board.
                    </p>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="feature-col bg-white p-8 text-center rounded-lg shadow-2xl transition duration-300 hover:shadow-2xl">
                    <i className="far fa-window-restore text-4xl text-blue-500 mb-4"></i>
                    <h4 className="text-xl font-semibold mb-2">Fully Responsive</h4>
                    <p className="text-gray-600">
                        Accurate information of work. Visualization achieved through the board.
                    </p>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="feature-col bg-white p-8 text-center rounded-lg shadow-2xl transition duration-300 hover:shadow-2xl">
                    <i className="fas fa-cloud text-4xl text-blue-500 mb-4"></i>
                    <h4 className="text-xl font-semibold mb-2">Cloud Based</h4>
                    <p className="text-gray-600">
                        Accurate information of work. Visualization achieved through the board.
                    </p>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="feature-col bg-white p-8 text-center rounded-lg shadow-2xl transition duration-300 hover:shadow-2xl">
                    <i className="far fa-thumbs-up text-4xl text-blue-500 mb-4"></i>
                    <h4 className="text-xl font-semibold mb-2">Easy to Use</h4>
                    <p className="text-gray-600">
                        Accurate information of work. Visualization achieved through the board.
                    </p>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="feature-col bg-white p-8 text-center rounded-lg shadow-2xl transition duration-300 hover:shadow-2xl">
                    <i className="far fa-life-ring text-4xl text-blue-500 mb-4"></i>
                    <h4 className="text-xl font-semibold mb-2">24 x 7 Support</h4>
                    <p className="text-gray-600">
                        Accurate information of work. Visualization achieved through the board.
                    </p>
                    </div>
                </div>
                </div>
            </div>
            </section>

     
        {/* <!--*************** My Services end Here ***************--> */}

        {/* <!--*************** My SKills start Here ***************--> */}
<section id="skills" className="skills container-fluid py-12">
  <div className="container mx-auto">
    <div className=" relative row session-title text-center mb-8">
      <h2 className="text-2xl font-bold">My Skills</h2>
      <p className="text-gray-600 mt-2 text-sm">
        A showcase of the technologies I work with and my proficiency in them.
      </p>
      <div className="absolute bottom-3 right-4">
                <a className="p-2 rounded-full shadow hover:cursor-pointer">
                    <img
                        src="\src\Public\add.png" 
                        alt="Add"
                        className="w-6 h-6"
                    />
                </a>
              </div>
    </div>
    <div className="row  skill-row grid grid-cols-2 md:grid-cols-7 gap-4 ">
      <div className="col-md-3">
        <div className="relative skill-col bg-white p-4 text-center rounded-lg shadow-md transition duration-300 hover:shadow-lg">
          <img
            src="\src\Public\1_x0d41ns8PTQZz4a3VbMrBg.png"
            alt="React Logo"
            className="w-16 h-16 mx-auto mb-3 rounded-full object-cover"
          />
          <h4 className="text-md font-semibold mb-1">React</h4>
           <div className="absolute bottom-1 right-2">
            <a className="p-2 rounded-full shadow ">
            <img
                src="\src\Public\delete.png" 
                alt="Edit"
                className="w-4 h-4"
            />
            </a>
           </div>
 </div>
      </div>
      <div className="col-md-3">
        <div className="skill-col bg-white p-4 text-center rounded-lg shadow-md transition duration-300 hover:shadow-lg">
          <img
            src="\src\Public\1_x0d41ns8PTQZz4a3VbMrBg.png"
            alt="Node.js Logo"
            className="w-16 h-16 mx-auto mb-3 rounded-full object-cover"
          />
          <h4 className="text-md font-semibold mb-1">Node.js</h4>
        </div>
      </div>
      <div className="col-md-3">
        <div className="skill-col bg-white p-4 text-center rounded-lg shadow-md transition duration-300 hover:shadow-lg">
          <img
            src="\src\Public\1_x0d41ns8PTQZz4a3VbMrBg.png"
            alt="Node.js Logo"
            className="w-16 h-16 mx-auto mb-3 rounded-full object-cover"
          />
          <h4 className="text-md font-semibold mb-1">Node.js</h4>
        </div>
      </div>
      <div className="col-md-3">
        <div className="skill-col bg-white p-4 text-center rounded-lg shadow-md transition duration-300 hover:shadow-lg">
          <img
            src="\src\Public\1_x0d41ns8PTQZz4a3VbMrBg.png"
            alt="Node.js Logo"
            className="w-16 h-16 mx-auto mb-3 rounded-full object-cover"
          />
          <h4 className="text-md font-semibold mb-1">Node.js</h4>
        </div>
      </div>
      <div className="col-md-3">
        <div className="skill-col bg-white p-4 text-center rounded-lg shadow-md transition duration-300 hover:shadow-lg">
          <img
            src="\src\Public\1_x0d41ns8PTQZz4a3VbMrBg.png"
            alt="JavaScript Logo"
            className="w-16 h-16 mx-auto mb-3 rounded-full object-cover"
          />
          <h4 className="text-md font-semibold mb-1">JavaScript</h4>
        </div>
      </div>
      <div className="col-md-3">
        <div className="skill-col bg-white p-4 text-center rounded-lg shadow-md transition duration-300 hover:shadow-lg">
          <img
            src="\src\Public\1_x0d41ns8PTQZz4a3VbMrBg.png"
            alt="HTML5 Logo"
            className="w-16 h-16 mx-auto mb-3 rounded-full object-cover"
          />
          <h4 className="text-md font-semibold mb-1">HTML5</h4>
        </div>
      </div>
      <div className="col-md-3">
        <div className="skill-col bg-white p-4 text-center rounded-lg shadow-md transition duration-300 hover:shadow-lg">
          <img
            src="\src\Public\1_x0d41ns8PTQZz4a3VbMrBg.png"
            alt="CSS3 Logo"
            className="w-16 h-16 mx-auto mb-3 rounded-full object-cover"
          />
          <h4 className="text-md font-semibold mb-1">CSS3</h4>
        </div>
      </div>
    </div>
  </div>
</section>



        {/* <!--*************** My SKills ends Here ***************--> */}

         {/* <!--*************** My posts starts Here ***************--> */}

         <div id="blog" className="container-fluid bg-gray-100 py-12 px-4 md:px-8">
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">Recent Posts</h2>
          <p className="text-gray-600">
            There are many variations of passages of Lorem Ipsum available, but the majority have suffered
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-4 shadow-md rounded-lg mb-6">
            <img src="\src\Public\d1.jpg" alt="Blog 1" className="w-full mb-4 rounded"/>
            <span className="text-gray-500 text-sm">August 9, 2019</span>
            <h4 className="text-xl font-semibold mt-3 mb-4">Orci varius consectetur adipiscing natoque penatibus</h4>
            <p className="text-gray-700 text-base">
              Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Praesent accumsan, leo in venenatis dictum,
            </p>
          </div>

          <div className="bg-white p-4 shadow-md rounded-lg mb-6">
          <img src="\src\Public\d1.jpg" alt="Blog 1" className="w-full mb-4 rounded"/>
            <span className="text-gray-500 text-sm">August 9, 2019</span>
            <h4 className="text-xl font-semibold mt-3 mb-4">Orci varius consectetur adipiscing natoque penatibus</h4>
            <p className="text-gray-700 text-base">
              Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Praesent accumsan, leo in venenatis dictum,
            </p>
          </div>
          

          <div className="bg-white p-4 shadow-md rounded-lg mb-6">
          <img src="\src\Public\d1.jpg" alt="Blog 1" className="w-full mb-4 rounded"/>
            <span className="text-gray-500 text-sm">August 9, 2019</span>
            <h4 className="text-xl font-semibold mt-3 mb-4">Orci varius consectetur adipiscing natoque penatibus</h4>
            <p className="text-gray-700 text-base">
              Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Praesent accumsan, leo in venenatis dictum,
            </p>
          </div>
        </div>
      </div>
    </div> 

   {/* <!--*************** My posts ends Here ***************--> */}

    </div>
  );
};

export default Profile;
