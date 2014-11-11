Project 3: ReShift
=====
*Alejandro Romero, Christian Mata, Sheldon Trotman*

###Instructions
A running instance of the application can be found at [ReShift API]. 

###Example Workflow

####Manager: 
To use our app, create an account and set your profile type to Manager. Here you have the ability to create a workplace. After creating a desired workplace, you can click the link and view that workplace view. 

Here you have a blank calendar to add shifts. Click any time slot after today's date and add a shift of some time. 

You will also have the ability to approve requests to join your workplace by employees.

####Employee:
Create an account as before with Employee chosen this time. Now you can request to join any previously created Workplace and wait for approval. 

####Manager:
Now in your Workplace view, you can approve the new employee that requested to join. This is located on the left hand side. Now you can create shifts that will be assigned to the employee.

####Employee:
Once approved to a shift, you can now view your shifts and those around you. If you can no longer work a shift you can click that shift and discard it and wait for other managers or employees to claim it.

###Pre-defined User Account:
If you want to log into an existing account with workplaces and employees. 
Log in as:
- email: test@mit.edu
- password: password 

Now navigate as usual. 

On [/test], the browser will run the test script that does basic assertions through QUnit. The view is changed to have results for each test appended to the divs through jQuery. QUnit's test results are also displayed.  

###Collaboration:

Models & Schemas: 
- Christian Mata

Public/Testing: 
- Alejandro Romero & Christian Mata

Public/Calendar: Sheldon

Public/Javascripts:
- *helpers:* Taken from recitation sample code
- *index:* Christian & Alex
- *users:* Christian
- *workplace_calendar:* Sheldon
- *workplaces:* Alex

Routes: 
- *employees:* Alex
- *index:* Christian
- *managers:* Alex
- *shifts:* Sheldon
- *workplaces:* Sheldon & Alex

Templates:
- *createWorkplace:* Alex
- *EWorkplaces.handlebars:* Alex
- *joinWorkplace:* Alex & Christian
- *login:* Christian
- *MWorkplaces:* Alex
- *myWorkplace:* Alex
- *myWorkplaces:* Alex
- *navbar:* Christian
- *otherWorkplace:* Alex
- *otherWorkplaces:* Alex
- *peopleTable:* Christian
- *signup:* Alex
- *specificWorkplace:* Sheldon
- *workplaceInfo:* Alex & Christian
 
Util: 
- *response:* Christian & Sheldon (inspired by Charles's source code)

Views:
- *index.ejs:* Alex & Christian 
- *test.ejs:* Christian 

Partials:
- -*head.ejs:* Christian
- -*navbar.ejs:* Christian
	
[ReShift API]:http://reshift-cmata.rhcloud.com/
[/test]:http://reshift-cmata.rhcloud.com/test
