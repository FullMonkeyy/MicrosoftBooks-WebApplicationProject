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
  3. Write the follow instruction in Tools->Nuget Package Manager-> Package Manager Console:
     ``` Add-Migration InitialMigration ```
  5. Now wait that the command is executed and then write this other command:
     ``` Update-Database ```

  At this point the webapp should works!

# MyLibrary
Here you can find your books by clicking on the MyLibrary button on the top of the page.
![Screenshot 2024-05-05 215444](https://github.com/FullMonkeyy/MicrosoftBooks-WebApplicationProject/assets/144152021/6a77db96-efaa-4a04-b501-0e4736dc5bdb)
In this page you can manage your books and see thei description and genres.

# To add a new book
In this page you'll be able to add a new book.
  Step 1: Click this button ![Screenshot 2024-05-05 215444 - Copy](https://github.com/FullMonkeyy/MicrosoftBooks-WebApplicationProject/assets/144152021/4f37ecaa-e8ea-4f22-af09-914a549600b2)
  Step 2: Choose the shelf where you wanna put your book
  Step 2: Choose the genres which your book owns.
  Step 3: Type Title,Author,Story, number of paged and the cover image. (If there is any kind of problem with the Title or Author just avoid to type punctuation. In that case you'll write the correct punctuation in the book editing page)

In the end you'll find your book in My Library.
![image](https://github.com/FullMonkeyy/MicrosoftBooks-WebApplicationProject/assets/144152021/39515466-6f16-4020-8f26-6422f642f744)
