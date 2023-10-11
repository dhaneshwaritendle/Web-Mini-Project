import React, { useEffect, useState } from 'react';
import { Form, useParams } from 'react-router-dom';
import { getToken } from '../../utils/auth';
import axios from 'axios';
import PageTitle from '../../components/PageTitle';
// import { SafeHTML } from '../../components/SafeHTML';
// import "./ViewCourse.modules.css";
import TinyMCEViewer from '../../components/TinyMCEViewer';
// import BasicRating from '../../components/BasicRating';

export default function ReviewCourse() {
  
  const params = useParams();

  const { courseId } = params;

  const [course, setCourse] = useState('');
  const [unitData, setUnitData] = useState({});
  const [authorName, setAuthorName] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
      const fetchCourses = async () => {
          const response = await axios.get('http://localhost:5000/api/courses', {
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + getToken(),
              },
              params: {
                  id: courseId,
              },
          });
          await setCourse(response.data.data);
          await setUnitData(response.data.data.unitData);
      };
      fetchCourses();
      const fetchUsersName = async () => {
        const response = await axios.get('http://localhost:5000/api/contributor/' + course.authorName, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getToken(), 
          },
        });
        if (response.data.data !== undefined) {
          setAuthorName(response.data.data.firstName + ' ' + response.data.data.lastName);
        }
      }
      fetchUsersName();
  }, [courseId, course.authorName]);

  // const handleCourseSubmit = (courseId) => {
  //   console.log("proceeding to submit : ", courseId);
  //   axios.patch(`http://localhost:5000/api/courses/${courseId}`, {}, {
  //       headers: {
  //           'Content-Type': 'application/json',
  //           'Authorization': 'Bearer ' + getToken(),
  //       },
  //       params: {
  //           status: "Approved"
  //       }
  //   })
  //   .then((response) => {
  //       console.log(response);
  //   })
  //   .catch((error) => {
  //       console.log(error);
  //   })
    // setShowSubmitAlertDialog(false);
    // setSnackbarMessage("Course Approved successfully!");
    // setShowSnackbar(true);
    // setTimeout(() => {
    //     window.location.reload();
    // }, 3000);
// }

  const handleApprovalClick=async(courseId)=>{
    try{
      console.log("proceeding to submit : ", courseId);
      const response=axios.patch('http://localhost:5000/api/courses/'+courseId,{
        headers:{
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + getToken(),
        },
        params: {
          status: "Approved"
      }
    });
     // Check the response for success or process it as needed
     if (response.status === 200) {
      // Successful update, you can update the local state or perform other actions.
      setStatus('Approved');
    } else {
      // Handle any other response codes or errors appropriately.
      console.log('Update failed with status code: ' + response.status);
    }
  }
  catch(error){
    console.log(error);
  }
  }

  return (
      <main id="main" className="main">

      <PageTitle title="Rate and Review Course" />

      <section className="section">
          <div className="row">
              <div className="col-lg-10">
                  <div className="card">
                      <div className="card-body">

                              <h5 className="card-title" style={{fontSize:'30px'}}>{ unitData.unitName !== undefined ? course.unitData.unitName : null }</h5>

                              <div style={{height:'25px'}} className="row"></div>

                              <p style={{ textAlign: 'left', fontSize: '15px' }} ><span style={{ fontWeight: 'bold' }}>Author: </span> {authorName !== undefined ? authorName : null }</p>

                              <div style={{height:'25px'}} className="row"></div>

                              <div className="row mb-3">
                                <label htmlFor="subject" className="col-sm-2 col-form-label">Subject</label>
                                <div className="col-sm-10">
                                  {course.subjectData !== undefined ? course.subjectData.subjectName : "" }
                                </div>
                              </div>

                              <div style={{height:'25px'}} className="row"></div>

                              <div className="row mb-3">
                                <label htmlFor="unit" className="col-sm-2 col-form-label">Unit</label>
                                <div className="col-sm-10">
                                  { unitData.unitName !== undefined ? unitData.unitName : null }
                                </div>
                              </div>

                              <div style={{height:'25px'}} className="row"></div>

                              <div className="row mb-3">
                                <label htmlFor="course_desc" className="col-sm-2 col-form-label">Course Description</label>
                                <div className="col-sm-10">
                                  {unitData.unitDescription !== undefined ? unitData.unitDescription : null }
                                </div>
                              </div>

                              <div style={{height:'25px'}} className="row"></div>

                              <div className="row mb-3">
                                <label htmlFor="course_objectives" className="col-sm-2 col-form-label">Course Objectives</label>
                                <div className="col-sm-10">
                                  <ul>
                                    {
                                      unitData.unitObjectives !== undefined ? unitData.unitObjectives.map((objective, index) => {
                                        return (
                                          <li key={index}>
                                            {objective}
                                          </li>
                                        );
                                      }) : ""
                                    }
                                  </ul>
                                </div>
                              </div>

                              <div className="row mb-3">
                                <label htmlFor="course_prerequisites" className="col-sm-2 col-form-label">Course Prerequisites</label>
                                <div className="col-sm-10">
                                  <ul>
                                    {
                                      unitData.unitPrerequisites !== undefined ? unitData.unitPrerequisites.map((prereq, index) => {
                                        return (
                                          <li key={index}>
                                            {prereq}
                                          </li>
                                        );
                                      }) : ""
                                    }
                                  </ul>
                                </div>
                              </div>

                              <div style={{height:'25px'}} className="row"></div>

                              <hr />

                              {
                                  course.courseVideoPath !== undefined && course.courseVideoPath !== '' ? (
                                      <>
                                      <video width="800px" height="500px" controls="controls">
                                          <source src={'http://localhost:5000/' + course.courseVideoPath.replace(/\\/g, '/').replace('public/', '').replace(/ /g, '%20')} type="video/mp4" />
                                      </video>
                                      </>
                                  ) : null
                              }

                              <hr />

                              {
                                  course.coursePdfPath !== undefined && course.coursePdfPath[0] !== undefined  ? (
                                      <>
                                      <iframe title='course_pdf' src={'http://localhost:5000/' + course.coursePdfPath[0].replace(/\\/g, '/').replace('public/', '').replace(/ /g, '%20')} 
                                      width="800"
                                      height="500">
                                      </iframe>
                                      </>
                                  ) : null
                              }

                              <hr />

                              <div className="row">
                                  <div className="col-lg-3 col-md-4 label" style={{fontSize: '20px'}}>Notes</div>
                                  <div className="col-lg-9 col-md-8">
                                  {/* <SafeHTML className={"space-y-2 sm:space-y-4"} >
                                  { course.courseContent !== undefined ? course.courseContent : null }
                                  </SafeHTML> */}
                                  </div>
                              </div>
                              <br />

                              <TinyMCEViewer initialContent={course.courseContent !== undefined ? course.courseContent : null} />

                              <div style={{height:'25px'}} className="row"></div>

                              <div className="row">
                              {/* <div className="col-lg-3 col-md-4 label" style={{fontSize: '20px'}}>Review this content</div>
                                  <div className="col-lg-9 col-md-8">
                                      <Form>
                                          <BasicRating size='medium' rating={3} />
                                      </Form>
                                  </div>
                              </div> */}
                              <div className="col-lg-3 col-md-4 label" style={{fontSize: '20px'}}></div>
                                  <div className="col-lg-9 col-md-8">
                                      <Form>
                                      <button
                className={`btn ${status === 'Approved' ? 'btn-success' : 'btn-primary'}`}
                onClick={handleApprovalClick}
                disabled={status === 'Approved'} // Disable the button if already approved
              >
                {status === 'Approved' ? 'Approved' : 'Approval'}
              </button>
                                         <span> </span>
                                         <button className="btn btn-danger">Raise Issue</button>
                                      </Form>
                                  </div>
                              </div>
                      </div>
                  </div>
              </div>
          </div>
      </section>
  </main>
  );
}