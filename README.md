# GreenCheck Learning Management System
## A new way to engage students in the classroom

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


## 1 Abstract

The digital world inside of education is growing exponentially as teachers are utilizing
technology to enhance the student experience. Although technology has become a backbone
supporting education, teachers still combat the problem of keeping students on task and
turning in assignments on time. GreenCheck LMS is a platform designed to reward students
for these on-time submissions. We have implemented a point-based reward system that
promotes healthy class behaviors. Once earned, points can be redeemed on profile picture
enhancements using the platform’s built-in point shop. Though built with the student in
mind, the teacher’s side of the application is incredibly robust too. The teacher portal
allows for educators to monitor student submissions, and point accrual. Students that are
top performers of the application will be outlined to the teacher in a sidebar on the teacher
portal. This allows for the teacher to know which students are collecting the most points.
The methods utilized for our project hopes to solve a tremendous issue that causes even a
successful student from reaching their best potential by forgetting to turn in work.


## 2 Introduction

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

## 3 Related Work

Works that have tried to make education fun and exciting by adding game-like com-
ponents can be grouped into several different categories: in class interactive, out-of-class
interactive, and fully interactive. The in-class interactive group focuses on the engagement
of students while class is in session. It allows for the students to participate on assignments


while the educator is present to proctor. One source says that it is important to supplement
lecture time with engaging activities because using a format that consists solely of traditional
learning will cause, “students to quickly tune out and stop engaging during [the] lecture”
(“Teaching in the Virtual Classroom” 2015). Some examples of in class engagement include
formative assessments for teachers such as games for review and polling. Applications that
target this grouping focus only on short term rewarding, where students cannot redeem
points that they have accrued past the end of the activity. These points do not carry over
to any other assignments, and have no value that is assigned to them. When students are
able to accrue the points that they have earned, a significance will be assigned making the
points more valuable to the student.

Activities that focus on the out-of-class interactive grouping tend to use the endowment
effect for its benefit. “Thaler (1980) proposed that individuals will value something that they
possess more than something of similar objective value that is not possessed” (“Influencing
Positive Student Behavior Using the Endowment Effect” 2019). These out-of-class activities
use points that can be redeemed to obtain a value to the student. Though the endowment
effect is used to exploit the k-12 classroom, it is also used in many different continuing ed-
ucation courses as well. One article, when explaining how to make security trainings more
engaging toward adults, said that it is important to, “incorporate [these] interactive exhibits
and activities in your security training program” (Goldman 2019). The text continues to
claim that there are many positive results when integrating gamified elements into tradi-
tional education outside of the classroom. The backfall of only using out-of-class interactive,
however, is that they do not integrate well with the class lecture.

The final grouping, fully interactive, seeks to fix this disconnect between in class and
out-of-class interactive by totally immersing the classroom in game-like components. Though
many solutions exist within this grouping due to it’s fun atmosphere, there are several flaws
that get introduced when only using gamified learning. In an article that explains how to
create a fully game-like classroom, the author expresses one of his main concerns toward
a classroom of this type. “It is notable that not all learners are game players, and not all
teachers are keen advocates for the use of games or experienced with adopting games to
engage students with learning in the classroom.” (Chen 2020). We believe this outlook is
due to the pure clunkiness of the fully gamified grouping. Most works in this group utilize
complex rules, and hard to follow schemes to spike the interest of the user.

In order to use this data to help our project, we needed to extract the key components
of each grouping, and find similarities with this data. This will allow us to implement a
solution that might be useful in the classroom. One thing that we noticed is that all three
solutions are polar opposites from each other. While one grouping uses gaming strictly only
in the classroom, another grouping would use gaming strictly out of the classroom. It seemed
that game components were only being used as a replacement, and not a supplement toward
education. We found that if an application were to be created that could supplement the
educator in a way without replacing their job, academic performance could be increased.
One article suggested that using a learning management tool with gamified aspects, “can
enhance students’ academic performance and the competencies gained, as well as provide
more diversified learning methods and motivation, and offer easy modifications for different


learning needs” (Chen 2018). We sought out to create an LMS system that can be used
inside of the classroom as well as outside of the classroom, but did not want it to become
clunky.

## 4 Dataset and Features

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

```
Figure 3.1 - Teacher Portal
![alt text](https://i.ibb.co/RHzMHBd/teacherportal.png)

```
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

```
Figure 3.2 - Items to Redeem
```
The following ERD diagram (see figure 3.3) shows how we stored the data we need for
this application. We created 7 tables that relate to each other using a primary key to foreign
key relationship, and an island table that stores settings. In order to allow users to have
multiple classes, we have a table that is dedicated to assigning classes to each user. A similar
table is used to allow users to claim items from the item store.


```
Figure 3.3 - ERD Diagram
```
## 5 Methods

This project has several main parts that work together to make the web app work
properly. We decided very early to create most of the design from scratch, because it was
a highly customized need targeted toward education. To accomplish this, we wanted to
use a client-server relationship to ensure that all clients could communicate with each other
through a central location. This would also allow us to update the application in a central
location, rather than having to push updates to all clients.

The server side of our application was built using NodeJS. We selected this language
due to it having the same syntax as client-side JavaScript. This makes it easier for us to
switch between client and server code when in development. In return, this could drive down
the cost of maintaining the project significantly. One of the main perks of using NodeJS is
how large the language’s development community is. We were able to use a prebuilt library
called Express to handle the hosting of the web server (“Express - Node.js web application
framework,” 2017). This library is widely used, and can support the injection of third party
code. We can use this library to follow a logic tree to see if a user has been authenticated.
For example, when a client connects to our web server, the server will check to see if the user
has a session variable defined in the request named user. If the variable is defined, the user
will be redirected to the dashboard that belongs to the account. If not defined, however, the
user will be redirected to the login page. This will ensure that the unauthenticated user will
not have access to a dashboard. The code used for this logic tree is below.

passport.use('local-signin', new LocalStrategy(
passReqToCallback : true, //allows us to pass back the request to the callback
function(req, username, password, done)
funct.localAuth(username, password)
.then(function (user)
if (user)
console.log("LOGGED IN AS: " + user.username);


```
req.session.success = 'You are successfully logged in '
+ user.username + '!';
done(null, user);
```
```
if (!user)
console.log("COULD NOT LOG IN");
req.session.error = 'Could not log user in. Please try again.';
//inform user could not log them in
done(null, user);
```
```
)
.fail(function (err)
console.log(err.body);
);
```
### ));

In the instance below, we will call a function that will query our database for a user.
If the user exists in the database, then the information sent over the API connection will
be forwarded to the code above to log the user in. If the user is not authenticated in the
system, the information forwarded will be null and terminated.

```
//Query Database
sql = 'call verifyuser(' + connection.escape(username) + ',' +
connection.escape(password) + ')';
console.log(sql);
query = connection.query(sql);
query.on('result', function(row)
if(row.constructor.name == 'RowDataPacket')
//Grab the columns that get sent
isvaliduser = row['Valid_User'];
isTeacher = row['Is_Teacher'];
profilePicture = row['Profile_Picture'];
firstname = row['First_Name'];
lastname = row['Last_Name'];
email = row['Email'];
points = row['Points'];
userID = row['User_ID'];
```
```
//Change isTeacher to Null if Student
if (isTeacher == 0)
isTeacher = null;
```
```
deferred.resolve(result);
```

```
else
deferred.resolve(false);
```
### );

```
connection.end();
return deferred.promise;
```
All transactions that are made from the server to the database utilize stored procedures in
their call. We decided to make this a standardized item in our project, because it would
allow the query to become more abstracted from the server code. When calling upon these
stored procedures, all variables are escaped using an escaping function that is provided by
the connector’s library. This, in return, allows for our code to become more secure since
we can rule out the usage of SQL injection attacks. An example of how we implemented a
stored procedure is shown below. This function will verify if the user’s credentials are correct
and ultimately return some user data if so.

-- Verify a User's Credentials
CREATE DEFINER=`appuser`@`%` PROCEDURE `app`.`VerifyUser`(uname VARCHAR(50),
passwd VARCHAR(50))
begin
select
COUNT (*) as "Valid_User",
if (count(*) = 0, -1,CAST ((Is_Teacher) as int)) as "Is_Teacher",
if (count(*) = 0, -1,User_id) as "User_ID",
if (count(*) = 0, -1,First_Name) as "First_Name",
if (count(*) = 0, -1,Last_Name) as "Last_Name",
if (count(*) = 0, -1,Email) as "Email",
if (count(*) = 0, -1,Points) as "Points",
if (count(*) = 0, -1,Profile_Picture) as "Profile_Picture"
from USERS
where
LOWER(Username) like LOWER(uname) and
Password = MD5(passwd) and
Is_Active_User = true;
end

## 6 Experiments/Results/Discussion

In order to evaluate the effectiveness of our project we must first take a look at what
teachers are currently implementing in their classrooms to monitor engagement. When


speaking with a local second grade teacher, she executed a reward system that would al-
low students to collect points based on good behaviors (M. Long, personal communication,
February 21, 2021). The reward system she used (see figure 5.1) would allow us to quanti-
tatively record a baseline dataset on how engaged students in her classroom are.

```
Figure 5.1 - Table Used For Data Collection
```
Using the chart above, we took baseline data to show the daily participation of one
student in Ms. Long’s class for a week (Figure 5.2). To graphically show the participation of
the student, we extracted the data correlating to the student’s completed work assignments
for the week. To align the data with our project, we can compare how many points the
student earned on traditional learning methods versus when using our application. In our
data, our student earned a total of 55 points out of the possible 100 points for turning in
assignments. It is important to remember that these points are only correlated to whether
the student turned in the assignment on time. The data is not related to the student’s score
in the class and is not a method of performance evaluation. This means that for the given
baseline week, the student was only 55 percent engaged to the class.


```
Figure 5.2 - Data Collected From Student
```
Now that this baseline data-set has been evaluated, we will begin to enroll the teacher in
our application. The teacher portal will allow us to gather data based on class participation
while using our platform. To register for an account, the teacher will sign up using an email
address, username, and password and select the type of account they want. (Figure 5.3).

```
Figure 5.3 - Sign-up Page
```

Upon registration and creation of a class, a class code will be generated. This class code
will be used to register any students that belong to the class. If a student already has an
account, he/she may add the class using the add a class button located on the top of their
dashboard (Figure 5.4).

```
Figure 5.4 - Student Portal
```
Now that both the student and the teacher have accounts, we can begin to take further
data. We will see how many avocados our baseline student earns in a given week with the
new platform. Since the avocados will be generated based on how soon the student turns
in the assignment, we can effectively use the baseline data to make our assumptions. In
our week of data collection we will have the teacher create 10 assignments and monitor the
student’s engagement throughout the week. This will put us on the same 100 point scale as
our baseline, and will allow us to see if our project is working effectively in enhancing the
student’s experience.

## 7 Conclusion/Future Work

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

## 8 Contributions

This project had several main parts that had to work together in order to run. In the
beginning, we both worked together on the project designs and wire-diagrams. We felt it was
necessary to have both of our minds on the design implementation due to the importance it
would have later down the road. After the designs for both the student and teacher portal
were created, we split the work directly down the middle to create non-functioning portals.
Sam worked on implementing the teacher portal, and Jeremy worked on implementing the
student portal. After the shell of each portal was created, it was time to focus on the
core implementation of an API. Jeremy worked on this API implementation, while Sam
worked on getting the database functioning. Afterwards, we would have the functioning core
components of our project. It was now time to get the features working. We made it a goal
to work on a different functionality everyday. We continued until both portals functioned
properly with the exception of the redeemable items page. Since this page was critical to
our project, We wanted to get our heads together about what redeemable items could be in
the point store. We both worked on implementing these items together until the project was
completed based on the original project scope.

## 9 References

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




