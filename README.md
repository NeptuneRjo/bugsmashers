<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a name="readme-top"></a>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->


<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/neptunerjo/bugsmashers">
    <img src="logo.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">Bug Smashers</h3>

  <p align="center">
    Bug Smashers is an issue tracking application similar to GitHub. Users can create or view projects and open up issues.
    <br />
    <br />
    <a href="https://github.com/NeptuneRjo/BugSmashers">View Demo</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

![Product demo gif](demo.gif)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

* C# / TypeScript
* ASP.NET
* React.Js
* XUnit
* Jest

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple steps.

The app is broken up into these projects:

1. `.API` - The controller and program 
2. `.BLL` - The service layer and AutoMapper configuration
3. `.DAL` - Repositories, entityframework models, input models, and migrations)
4. `.DTO` - Data transfer objects
5. `.Test` - The XUnit tests


### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/NeptuneRjo/BugSmashers.git
   ```
2. Select the .API project as the startup project if it isn't already
3. In the .API project, configure the appsettings.json file as following:
    ```json 
        "ConnectionStrings": {
            "DefaultConnection": "Your SQL Server Connection String"
        },
        "GitHub": {
            "ClientId": "Your GitHub OAUTH Client Id",
            "ClientSecret": "Your GitHub OAUTH Client Secret",
        },
        "JWT": {
            "Key": "A JWT Key"
        }
    ```
4. CD into the frontend project and install NPM packages
   ```sh
   cd ./bugtrackerfrontend 
   npm install
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/NeptuneRjo/BugSmashers.svg?style=for-the-badge
[contributors-url]: https://github.com/NeptuneRjo/BugSmashers/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/NeptuneRjo/BugSmashers.svg?style=for-the-badge
[forks-url]: https://github.com/NeptuneRjo/BugSmashers/network/members
[stars-shield]: https://img.shields.io/github/stars/NeptuneRjo/BugSmashers.svg?style=for-the-badge
[stars-url]: https://github.com/NeptuneRjo/BugSmashers/stargazers
[issues-shield]: https://img.shields.io/github/issues/NeptuneRjo/BugSmashers.svg?style=for-the-badge
[issues-url]: https://github.com/NeptuneRjo/BugSmashers/issues
[license-shield]: https://img.shields.io/github/license/NeptuneRjo/BugSmashers.svg?style=for-the-badge
[license-url]: https://github.com/NeptuneRjo/BugSmashers/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/linkedin_username
[product-screenshot]: images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com 
