# Microsoft Books Webapp
Hi everyone, this is my first fullstack web application that I'd ever made before.
The webapp has been completely coded in C# for the backend side and javascript,html and css for the frontend side.
I was eble to create and manage the database by using Microsoft Entity Framework Core. In fact, this is an ASP.NET REST c# web application so there are also apis.
I have to thanks Reti S.p.A. (Busto Arsizio) which teached me how to develop this kind of web sites as well.

![Screenshot 2024-05-05 215412](https://github.com/FullMonkeyy/MicrosoftBooks-WebApplicationProject/assets/144152021/71b45323-6615-4295-9ca6-d8f28396aa50)

# How to use Microsoft Books
Before start using the application you have to do 4 steps
  1. Launch the application for the first time. Obviuosly there will be errors, you have just to continue and follow the instrucion of Visual Studio. Now wait unti the main page of the web site.
  2. Now close the application.
  3. Write the follow instruction in Tools->Nuget Package Manager-> Package Manager Consol the following command:

     ``` Add-Migration InitialMigration ```
  5. Now wait that the command succed and then write this other command:
     ``` Update-Database ```

  At this point the webapp should works!
