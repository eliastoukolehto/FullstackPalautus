interface ContentProps {
  courseParts: CoursePart[];
}

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartBasic extends CoursePartBase {
  description: string;
  kind: "basic"
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}

interface CoursePartBackground extends CoursePartBase {
  description: string;
  backgroundMaterial: string;
  kind: "background"
}

interface CoursePartSpecial extends CoursePartBase {
  description: string;
  requirements: string[];
  kind: "special"
}

export type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial;


const Content = (props: ContentProps) => {
  const courseParts = props.courseParts

  return(
    <div>
    {courseParts.map((p) => {
      return (
        <div key={p.name}>
          <br />
          <b>{p.name} {p.exerciseCount}</b>
          {p.kind === 'basic' && 
          <div><i>{p.description}</i></div>
          }
          {p.kind === 'group' && 
          <div><i>project exercises {p.groupProjectCount}</i></div>
          }
          {p.kind === 'background' && 
          <span>
            <div><i>{p.description}</i></div>          
            <div>submit to {p.backgroundMaterial}</div>
          </span>
          }
          {p.kind === 'special' && 
          <div><i>{p.description}</i>
            <div>
              required skills: 
              {p.requirements.map((r) => { 
                return <span key={r}> {r}</span>
              })}
            </div>
          </div>
          }


        </div>
      )
    })}
    </div>
  )
}

export default Content