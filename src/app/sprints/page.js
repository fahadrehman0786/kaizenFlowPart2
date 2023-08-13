'use client';
import Image from 'next/image'
import styles from './sprints.module.css'
import { useEffect, useState } from 'react';
import { CheckItem, NestedChecklist } from '../components/nestedCheckBoxes';


function isAllSelected(node) {
  let allSelected = true;

  let flat = getFlattedChildren(node);

  flat.forEach((child) => {
    if (!child.isSelected) {
      allSelected = false;
    }
  });

  return allSelected;
}

function getFlattedChildren(node) {
  let flat = [node];
  node.children.forEach((child) => {
    flat = [...flat, ...getFlattedChildren(child)];
  });
  return flat;
}

const data = {
  value: "root",
  label: "root",
  isSelected: false,
  isDisabled: false,
  isCollapsed: false,
  children: [
    {
      label: "Big Goal of the week",
      value: "Big Goal of the week",
      isSelected: false,
      isDisabled: false,
      isCollapsed: false,
      isHeading: true,
      children: [
        {
          label: " Breakdown of Main Elements to Include of the Application",
          value: " Breakdown of Main Elements to Include of the Application",
          isSelected: false,
          isDisabled: false,
          isCollapsed: false,
          children: [
            {
              label: "Main Elements - Main Dashboard, Journey  & Calendar Dashboard (+Progress?)",
              value: "Main Elements - Main Dashboard, Journey  & Calendar Dashboard (+Progress?)",
              isSelected: false,
              isDisabled: false,
              isCollapsed: false,
              children: []
            },
            {
              label: "Secondary Elements - Foundation Board, Vision Board, Playground, Progress",
              value: "Secondary Elements - Foundation Board, Vision Board, Playground, Progress",
              isSelected: false,
              isDisabled: false,
              isCollapsed: false,
              children: []
            }
          ]
        },
        {
          label: " Created Journey Dashboard",
          value: " Created Journey Dashboard",
          isSelected: false,
          isDisabled: false,
          isCollapsed: false,
          children: [
            {
              label: "Create Roadmap/Sprint Section",
              value: "Create Roadmap/Sprint Section",
              isSelected: false,
              isDisabled: false,
              isCollapsed: false,
              children: []
            },
            {
              label: "Create Sprint/Task Section",
              value: "Create Sprint/Task Section",
              isSelected: false,
              isDisabled: false,
              isCollapsed: false,
              children: []
            }
          ]
        },
      ]
    }
  ]
};

export default function Home() {
  const tempProjects = [
    {
      position: 1,
      name: 'Sprint #1 - Create Basic Layout for Kaizen Flow',
      description: 'Create the basic layout for the Kaizen Flow application',
      level: "2",
      startDate: '1/12/2023',
      endDate: '1/18/2023',
      color: '#A05700',
      duration: 6,
      isCompleted: false
    }
    
]


  const [projects, setProjects] = useState(tempProjects);
  const [completedProjects, setCompletedProjects] = useState([]);
  const [projectName, setProjectName] = useState('');
  const [projectLevel, setProjectLevel] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [projectStartDate, setProjectStartDate] = useState('');
  const [projectEndDate, setProjecEndDate] = useState('');
  const [projectColor, setProjectColor] = useState('');

  // const [projectReward, setProjectReward] = useState('');
  // const [isConfirmed, setIsConfirmed] = useState(false);

  const [checklistData, setChecklistData] = useState(data);
  const allSelected = isAllSelected(checklistData);
  console.log("allSelected: ", allSelected);

  useEffect(() => {
    const nodes = getFlattedChildren(checklistData);
    const selected = []
    nodes.forEach((node) => {
      if (node.isSelected) {
        selected.push(node.value);
      }
    })
    console.log('These are the selected nodes: ', selected)
    // Here is where you would call an onSelect callback with these values
  }, [checklistData])

  // console.log("projectName", projectName)
  // console.log("projectDescription", projectDescription)
  // console.log("isConfirmed", isConfirmed)

  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);



  const MonthsArrayWithDays = [
    {
      month: 'January  ',
      days: 31
    },
    {
      month: 'February ',
      days: 28
    },
    {
      month: 'March ',
      days: 31
    },
    {
      month: 'April ',
      days: 30
    },
    {
      month: 'May ',
      days: 31
    },
    {
      month: 'June ',
      days: 30
    },
    {
      month: 'July ',
      days: 31
    },
    {
      month: 'August ',
      days: 31
    },
    {
      month: 'September ',
      days: 30
    },
    {
      month: 'October ',
      days: 31
    },
    {
      month: 'November ',
      days: 30
    },
    {
      month: 'December ',
      days: 31
    },
  ]

  const formatDate = (date) => {
    const yyyy = date.getFullYear();
    let mm = date.getMonth() + 1; // month is zero-based
    let dd = date.getDate();

    if (dd < 10) dd = + dd;
    if (mm < 10) mm = + mm;

    return mm + '/' + dd + '/' + yyyy;
  }


  const handleCreateSprint = () => {
    console.log("checklistData", checklistData)
    console.log("projectName", projectName)
    console.log("projectDescription", projectDescription)
    console.log("projectLevel", projectLevel)
    console.log("projectStartDate", projectStartDate)
    console.log("projectEndDate", projectEndDate)
    console.log("projectColer", projectColor)
    if(!projectName){
      alert('Please enter a project name')
      return;
    }
    if(!projectLevel){
      alert('Please select a project level')
      return;
    }
    if(!projectStartDate){
      alert('Please select a project start date')
      return;
    }
    if(!projectEndDate){
      alert('Please select a project end date')
      return;
    }
    if(!projectColor){
      alert('Please select a project color')
      return;
    }
    if(!projectDescription){
      alert('Please enter a project description')
      return;
    }

    const projectStartDateObj = new Date(projectStartDate);
    const  projectStartDateFormatted = formatDate(projectStartDateObj);

    const projectEndDateObj = new Date(projectEndDate);
    const  projectEndDateFormatted = formatDate(projectEndDateObj);
    
    
    // calculate duration
    const difference = new Date(projectEndDate) - new Date(projectStartDate)
    var days = difference/(24*3600*1000);
    if(days < 1){
      alert('Please select a project end date that is after the start date')
      return;
    }
    
    console.log("duration", days,)
    const newProject = {
      position:  projects.length>0?projects[projects.length-1].position+1:1,
      // position: projects[projects.length - 1].position + 1,
      name: projectName,
      description: projectDescription,
      level: projectLevel,
      startDate: projectStartDateFormatted,
      endDate: projectEndDateFormatted,
      color: projectColor,
      duration: days,
      isCompleted: false
    }
    setProjects([...projects, newProject])
  }


  useEffect(() => {
    console.log("projects", projects)
  }, [projects])


  const completeProjectAndUpdatePostions = async (project) => {
    console.log("project", project)
    const currPostion = project.position;
    const completedPostion = completedProjects.length>0?completedProjects[completedProjects.length-1].position+1:1
    console.log("completedPostion", completedPostion, completedProjects.length>0, completedProjects, completedProjects[completedProjects.length-1])
    const completedProject = {...project, position: completedPostion}

    const updatedProjects = projects.filter((project) => {
      return project.position !== currPostion
    })
    // update positions of updatedProjects
    const newUpdatedProjects = updatedProjects.map((project, index) => {
      if(currPostion < project.position){
        project.position = project.position-1
      }
      return project
    })
    console.log("updatedProjects", updatedProjects)
    setProjects(newUpdatedProjects)
    setCompletedProjects([...completedProjects, completedProject])
  }

    
  return (
    <main className={styles.main}>

      <div className={`offcanvas offcanvas-end w-50 ${styles.offCavas}`} tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
          <div
            className={`${styles.offCavasBodyCloseBtn}`}
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          > X </div>
        <div className={`offcanvas-body ${styles.offCavasBody}`}>
          <div className={`${styles.offCavasBodyContent}`}>
            <input value={projectName} onChange={(e)=>setProjectName(e.target.value)} className={`${styles.titleInput}`}  type='text' placeholder='🎯 Sprint #1 - Create Basic Layout for Kaizen Flow' />
              
            {/* </h1> */}
            {/* select input to select level */}
            <div className={`${styles.levelSelectWrapper}`}>
              <label className={`${styles.levelInputTitle}`} htmlFor='level' >Which Level</label>
              <select onChange={(e)=>setProjectLevel(e.target.value)} className={`${styles.levelInput}`} name="level" id="level">
                <option selected disabled>Select Level</option>
                <option value="1">Level 1</option>
                <option value="2">Level 2</option>
                <option value="3">Level 3</option>
                <option value="4">Level 4</option>
                <option value="5">Level 5</option>
                <option value="6">Level 6</option>
                <option value="7">Level 7</option>
                <option value="8">Level 8</option>
                <option value="9">Level 9</option>
                <option value="10">Level 10</option>
              </select>
            </div>

            <div className={`${styles.dateColorPicker}`}>
            <div className={`${styles.dateWrapper}`}>
              <div>
                <Image src="/images/calendarIcon.svg" alt="calendar icon" width={24} height={24} />
              </div>
              <div className={`${styles.datePickerWrapper}`}>
                <div className={`${styles.datePickerTitle}`}>Start Date</div>
                <input onChange={(e)=>setProjectStartDate(e.target.value)} className={`${styles.datePicker}`} type="date" id="date" name="date" />
              </div>
              <div className={`${styles.datePickerWrapper}`}>
                <div className={`${styles.datePickerTitle}`}>End Date</div>
                <input onChange={(e)=>setProjecEndDate(e.target.value)} className={`${styles.datePicker}`} type="date" id="date" name="date" />
              </div>
            </div>
            <div className={`${styles.colorWrapper}`}>
              <Image src="/images/colorIcon.svg" alt="color icon" width={24} height={24} />
              <div className={`${styles.colorPickerTitle}`}>Color</div>
              {/* input color picker */}
              <input onChange={(e)=>setProjectColor(e.target.value)} className={`${styles.colorPickerInput}`} type="color" id="color" name="color" />


            </div>
            
            </div>            
            
            <textarea value={projectDescription} onChange={(e)=>setProjectDescription(e.target.value)} className={`my-4 ${styles.projectDescriptionTextArea}`} rows={2} placeholder=""></textarea>
            
            
            <h2 className={`${styles.todoHeading}`}>
              To Get Done This Week:
            </h2>

            <div className={`${styles.todoWrapper}`}>

            <NestedChecklist
                data={checklistData.children}
                setData={setChecklistData}
              />
            </div>
            <div className={`${styles.tag}`}>
             <p>👷‍♂️🏗️Brand Protyping & Samples - Engineer</p>
            </div>

            <div className={`${styles.createSprint}`}>
              <button className={`${styles.btnPrimary}`} onClick={()=>handleCreateSprint()} data-bs-dismiss="offcanvas"
            aria-label="Close">SAVE</button>
            </div>

          </div>
        </div>
      </div>

      <header className={styles.header}>
        <div className={styles.leftSection}>
          <Image
            src="/images/logo2.png"
            alt="Sprints Logo"
            width={60}
            height={60}
          />
          <h1>Name of Main Project</h1>
        </div>
        <div className={styles.rightSection}>
          <button className={`${styles.btn} ${styles.btnSecondary}`}>Personal</button>
          <button className={`${styles.btn} ${styles.btnPrimary}`}>Business</button>
        </div>
      </header>
      <div className={`${styles.sprintBtnNav}`}>
        <button className={`${styles.btnSecondary} ${styles.dotted}`} type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
          Add New Sprint
          <Image
            src="/images/plusIcon.svg"
            alt="Sprints add icon"
            width={24}
            height={24}
          />
        </button>
        <button className={`${styles.btnPrimary}`}>Monthly</button>
      </div>

      {/* <button class="btn btn-primary" >Toggle right offcanvas</button> */}

      

      <div className={styles.content}>
        {/* calender strip */}
        <div className={styles.calenderStrip}>
          {MonthsArrayWithDays.map((month, monthIndex) => {
            return (
              <div key={monthIndex} className={styles.monthWrapper}>
                <div className={styles.month}>{month.month} 2023</div>
                <div className={styles.daysWrapper}>
                  {[...Array(month.days).keys()].map((day, daysIndex) => {
                    const monthNumber = monthIndex + 1;
                    const dayNumber = daysIndex + 1;
                    const date = `${monthNumber}/${dayNumber}/2023`;
                    
                    let isActiveDate = false
                    if( date === new Date().toLocaleDateString('en-us')){
                      isActiveDate = true
                    }
                    
                    return (
                      <div key={daysIndex} className={`${styles.day} ${isActiveDate?styles.activeDate:""}`}>
                        {day}
                      </div>
                    );
                  })}
                </div>
                <div className={styles.sprintsPending}>
                  <div className={styles.column}>
                  </div>
                    {[...Array(month.days).keys()].map((day, daysIndex) => {
                      let foundProjectsIndex = 0;
                        const monthNumber = monthIndex + 1;
                        const dayNumber = daysIndex + 1;
                        const date = `${monthNumber}/${dayNumber}/2023`;
                        let foundProjects = []
                        // if(date === '8/12/2023'){
                          // console.log("date", date)
                          foundProjects = projects.filter((project) =>{
                            return project.startDate == date
                          });
                          if(foundProjects.length > 0){
                            // foundProjectsIndex += foundProjects.length
                            // console.log("foundProjects", foundProjects)
                          }
                        // }

                        
                      return (
                        <div key={daysIndex} className={styles.column}>
                          {foundProjects.map((project, projectIndex) => {

                            return(
                              <>
                              {project && !project.isCompleted && (
                                <div className={styles.projectWrapper} style={{position: 'relative', minHeight: "100px", marginTop: `calc(100px * ${project.position-1} + 20px)`}}>
                                  <div className={styles.sprint} onClick={()=>completeProjectAndUpdatePostions(project)} style={{backgroundColor: project.color, width: `calc(47px * ${project.duration})`}}>
                                    <div className={styles.sprintTitle}>{project.name}</div>
                                    <div className={styles.sprintDescription}>
                                      Level: {project.level}
                                      - 
                                      {new Date(project.startDate).getDate()+" "+MonthsArrayWithDays[new Date(project.startDate).getMonth()].month }
                                      { " to "}
                                      {new Date(project.endDate).getDate()+" "+MonthsArrayWithDays[new Date(project.endDate).getMonth()].month }
                                    </div>
                                  </div>
                                </div>
                              )}
                              </>
                          )})}
                          
                        </div>
                      );
                    })}
                  </div>
                <div className={styles.sprintsCompleted}>
                    <div className={`${styles.column} ${styles.completed}`}>
                    </div>
                    {[...Array(month.days).keys()].map((day, daysIndex) => {
                      let foundProjectsIndex = 0;
                        const monthNumber = monthIndex + 1;
                        const dayNumber = daysIndex + 1;
                        const date = `${monthNumber}/${dayNumber}/2023`;
                        let foundProjects = []
                        // if(date === '8/12/2023'){
                          // console.log("date", date)
                          foundProjects = completedProjects.filter((project) =>{
                            return project.startDate == date
                          });
                          if(foundProjects.length > 0){
                            // foundProjectsIndex += foundProjects.length
                            // console.log("foundProjects", foundProjects)
                          }
                        // }

                        
                      return (
                        <div key={daysIndex} className={`${styles.column} ${styles.completed}`}>
                          {foundProjects.map((project, projectIndex) => {

                            return(
                              <>
                              {project && !project.isCompleted && (
                                <div className={styles.projectWrapper} style={{position: 'relative', minHeight: "100px", marginTop: `calc(100px * ${project.position-1} + 20px)`}}>
                                  <div className={`${styles.sprint} ${styles.completedSprint}`} style={{ width: `calc(47px * ${project.duration})`}}>
                                    <div className={styles.sprintTitle}>{project.name}</div>
                                    <div className={styles.sprintDescription}>
                                      Level: {project.level}
                                      - 
                                      {new Date(project.startDate).getDate()+" "+MonthsArrayWithDays[new Date(project.startDate).getMonth()].month }
                                      { " to "}
                                      {new Date(project.endDate).getDate()+" "+MonthsArrayWithDays[new Date(project.endDate).getMonth()].month }
                                    </div>
                                  </div>
                                </div>
                              )}
                              </>
                          )})}
                          
                        </div>
                      );
                    })}
                </div>
              </div>
            );
          })}
        </div>

        <div className={`${styles.levelsCompletedContainer}`}>
           { [...Array(10).keys()].map((level, index) => {
            let isLevelCompleted = false;
            const foundProjects = projects.find((project) =>{
              return project.level == level
            });
            if(!foundProjects){
              const foundCompletedProjects = completedProjects.find((project) =>{
                return project.level == level
              });
              if(foundCompletedProjects){
                isLevelCompleted = true
              } 
            }

           return(
            <div className={`${styles.levelCompletedWrapper} ${isLevelCompleted?styles.levelDisplay:"d-none"}`}>
              <div className={`${styles.levelCompletedTitle}`}>{`Level ${level} Completed`}</div>
              <Image src="/images/checkGreen.svg" alt="level complete icon" width={24} height={24} />
            </div>
            )}
          )}

        </div>
            
      

      </div>
      
    </main>
  )
}
