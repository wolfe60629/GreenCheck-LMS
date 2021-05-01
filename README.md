# GreenCheck Learning Management System
![alt text](https://i.ibb.co/m65kj8c/Capture.png)


## Built With
* [NodeJS](https://expressjs.com)
* [HandleBars](https://handlebarsjs.com/)
* [Passport](http://www.passportjs.org/) 
* [Normalize.css](https://necolas.github.io/normalize.css)

## Installation

```
$ git clone https://github.com/wolfe60629/GreenCheck-LMS.git
$ cd ./GreenCheck-LMS
$ npm install
$ node configure
$ npm start

Go to `http://localhost:80`
```

## Introduction

In such times of technological dependence, K-12 educators constantly search for new
tools to keep students engaged in the classroom and online. Our project, created with the
help of some local teachers, seeks to implement an engaging experience for students, while
keeping their focus solely on turning in assignments promptly. To achieve this goal, we will
create a simplistic user interface with a reward system that encourages on-time submissions
and allows the educator to track the submissions of assignments. Upon registration, teachers
can create new classes, add assignments to their classes, and watch students input their
assignments to collect reward points. These reward points are calculated in an algorithm
that deducts two points out of ten for every hour late on an assignment. If a student collects
enough reward points, they can redeem these points for upgraded enhancements to their
account’s profile picture. Having something fun and motivating for students is what drives
them to want to succeed by themselves. In return, our idea can create a chain reaction that
carries on and becomes a fun competition for everyone to participate in. Although there are
existing web applications that enable instructors to give assignments out to students, they
are not very user friendly on either end. They have various existing problems that hinder
the web application to be more of a nuisance than provide the help a student requires for
proper academic success. One such problem exists in KSU’s Brightspace notification system
where the notifications end up being more confusing to students due to the way the system
sends out the notification (“D2L Brightspace Student Guide,” 2018). The platform ends
up cutting out most of the message, requiring a student to stop what they are doing and
log in to the system to be able to fully access the notification. Another problem that is
present within the system is the option to get a notification when the assignment is due
only two days away. In some cases, such as an assignment with only one day to complete,
a student could possibly not see that it is due soon because the system fails to notify them
adequately. This Brightspace system once again fails to deliver the extra needed reminder
that students require. We took these frustrations in mind when developing our platform,
and hope to redesign what is currently in the market. The motivation behind our project
began when the COVID-19 pandemic shook the educational world. Though some districts
had prepared for online education by offering select trainings to teachers on how to manage a
class remotely, no one had prepared for an extended period of online dependency lasting over
a year. Additionally, both of us have close relational ties to educators within our district.
When reaching out to these educators, most of them expressed how hard it was to motivate
students in the newly adopted online format. This sparked our interest and created the
foundations we have today within our project.

## Dataset and Features

Since our project focuses on using online techniques to enhance the engagement of a
classroom, both students and teachers will have a large amount of data that will need to be
stored. To use our application, basic information will be asked upon during registration. This
includes the user’s username, password, email, and if the user is a student or a teacher. This
data will be the first to get stored in a MySQL database located on the application server.
To ensure security of this data, passwords are stored using an MD5 hashing algorithm built
directly into our database. Additionally, all communications between the server and client
will be using the https protocol to prevent a man-in-the-middle attack. In order to describe
the types of data that our application will be collecting and why that data is relevant to the
project, we can break the data down into three main categories: observation, organization,
and engagement.

A critical piece in any learning management system is to provide a way for teachers
to observe the performance and engagement of their students. The teacher’s dashboard is
built to streamline this process by showing each student’s performance in the class (Figure
3.1). The dashboard will allow for the teacher to post up new assignments, edit existing
assignments, and view student submissions. When adding coursework, the instructor will
provide a title, due date, and description of their assignment. They will also have the option
to attach a document, or set a limit to the number of submissions that each student can
have. Once students complete an assignment, the submission will be revealed on the teacher’s
dashboard underneath that particular assignment listing.

Organization is a critical piece in student success and should not be taken lightly. If
a student lacks organization in the classroom, it could lead to poor performance and place
the student behind in instruction. Our way of solving this issue is to provide a dashboard
that shows when assignments are due in each class. As soon as the student logs into our

application, a tab for each class that they are assigned to is created in their dashboard.
When their teacher posts a new assignment, it is listed underneath the appropriate class
tab. Items shown to the student for each assignment include: the title of the task, the
number of submissions allotted, the due date, and how many points would be accrued if
submitted. In addition to these tabs, the student dashboard will outline a priority queue
based on when assignments are due. This priority queue is posted on the left-hand side of the
student dashboard and can be accessed at any time during the session (Shown in Figure 5.4).
If ready to submit an assignment, our portal allows the students to select files from their
device in order to send them to their teacher. Once submitted, points will be added to their
account as a prize for completing the assignment. Maximizing student engagement is the
overall goal of our project. To tackle this goal, we devoted a category directly to focus on the
gamification of the learning management system. When a student submits their assignment
into the application, a point value will be associated with their submission. To calculate this
point value, our server will use an algorithm based on the current date of the submission and
the due date of the assignment. Any points that the student accrues will be added to their
profile count. The student’s accrued points, shown at the top of their dashboard, will show
how much progress they have made. Once a student has accrued enough points, they can
redeem an item such as profile enhancements that is in the point store. To redeem this item,
a button located at the top of their dashboard will redirect the user to the store. This point
system will not only keep students accountable, but use the reward system as a motivator
to turn in assignments on time.

The following ERD diagram (see figure 3.3) shows how we stored the data we need for
this application. We created 7 tables that relate to each other using a primary key to foreign
key relationship, and an island table that stores settings. In order to allow users to have
multiple classes, we have a table that is dedicated to assigning classes to each user. A similar
table is used to allow users to claim items from the item store.


```
Figure 3.3 - ERD Diagram
```
![alt text](blob:https://pasteboard.co/b441e8ff-8ce5-4770-a124-79dfa8df8588)

## Conclusion/Future Work

This web application allows for educators to easily assign work to students. It also
serves as an efficient and easy to digest reminder tool allowing students to be able to stay
on top of their work. The method utilized for the project solved a tremendous issue that
causes even a successful student from reaching their best potential by forgetting to turn in
work. Our project also solved the complexity issue seen with other learning management
systems. We listened to the concerns of the teachers, and placed a lot of focus on making
the platform easy to navigate. One of the major difficulties faced during this project was
figuring out a way to keep students entertained in a consistent manner. Though other
projects use complex plots and fake worlds to combat this issue, the complexity to both the
student and the teacher almost distracts from the overall goal. After various reiterations the
project came to its final modification where students can redeem their points for small profile
enhancements. These enhancements will not distract the user, and will provide a sense of
pride to the user when able to redeem their points. Another major difficulty we ran into
was programming all of the various systems to work together seamlessly. Since we knew this
issue would arise eventually, we utilized Github’s change management software to effectively


be able to rollback a feature that was implemented by mistake. Included in the software is a
way for contributors to report bugs and enhancement requests. We will be using this feature
to maintain our project, and add additional features that were out of this project’s scope.
In the future, we would like to create the ability for schools to link our project with their
own learning management systems. This would open up the possibility for full integration
with a district’s login portal, and grading systems. As the project sits currently, teachers
would use our project for student submissions and tracking but would have to use their
district approved learning management system for grading. Another feature that could be
extremely useful would be the implementation of services such as TurnItIn to allow for a
better experience and to prevent any type of academic dishonesty.

## References

Cheng-Chia (Brian) Chen, ChingChih (Kathy) Huang, Gribbins, M., Swan, K. (2018).
Gamify Online Courses With Tools Built Into Your Learning Management System (LMS)
to Enhance Self-Determined and Active Learning. Online Learning, 22(3), 41–54.

Faulk, L. H., II, Settlage, D. M., Wollscheid, J. R. (2019). Influencing Positive Student Be-
haviour Using the Endowment Effect. E-Journal of Business Education and Scholarship
of Teaching, 13(1), 20–29.

Goldman, E. H. (2019). Push the Button: Making Security Training Fun and Interactive.
International Journal of Information Security Cybercrime, 8(1), 30–34.

Hansen Prince, C., Clayton, J. (2020). Teaching in the Virtual Classroom. Radiologic
Technology, 92(2), 196–203.


Si Chen, Sujing Zhang, Grace Yue Qi, Junfeng Yang. (2020). Games Literacy for Teacher
Education: Towards the Implementation of Game-based Learning. Journal of Educa-
tional Technology Society, 23(2), 77–92.

Play Prodigy. (2021). Retrieved February 20, 2021, from Prodigygame.com website: https://play.prodigygame.com/

Long, M. (2021, February 21). Classroom Data Interview (J. Wolfe, Interviewer) [Personal
communication].

Express - Node.js web application framework. (2017). Retrieved March 14, 2021, from
Expressjs.com website: https://expressjs.com/

Passport.js. (2021). Retrieved March 14, 2021, from Passport.js website: [http://www.passportjs.org/](http://www.passportjs.org/)




