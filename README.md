# Junior Design P2P Payment System Client App

## Prerequisite Softwares
1. Node v16+ - [download](https://nodejs.org/en/download)
2. Git - [download](https://git-scm.com/downloads)
3. Expo Go for phone testing (app store)
4. Xcode for iOS simulation (only available on mac)

## Download Instructions
1. Navigate to green <>Code box in this repository (sls3105_client) which is to the left of the 'About' section
2. Click on 'Download ZIP'
3. Move the ZIP file wherever you want it to be on your device
4. Click on the ZIP file to retrieve a folder which hosts needed files for the project
5. Only the ZIP file can be discarded afterwards

## Install Dependencies
Do this after downloading the ZIP file. Dependencies must be installed for each time the project repository is downloaded.
1. In your device's command prompt (terminal, windows command prompt, etc.), navigate to root of project (sls3105_client folder): cd /insert path here/
2. Run ``npm i`` to install dependencies
3. All required dependent libraries will be downloaded with the command above - no additional downloads necessary for installing dependencies

## Run Instructions
1. In your device's command prompt (terminal, windows command prompt, etc.), navigate to root of project (sls3105_client folder): cd /insert path here/
2. You need two terminals open to run the project.
   * Run ``npx expo start`` to generate a QR code to run the app locally
   * Run ``npx convex dev --typecheck=disable`` to start the backend locally
3. Navigate to the generated QR code to test project via phone testing or click 'i' for Xcode iOS simulation

## Troubleshooting guide

| Problem | Solution |
| --- | --- |
| Password creation when creating an account | Check command prompt which returns errors in entered password |
| Hidden elements on screen | Press 'r' in command prompt to reload app |
| Convex | Ensure Convex url is configured in dotenv (For questions - email devsls105@gmail.com) |
| Account creation error | Read error message(s) in command prompt |

# Release Notes
## Version 0.5.0
### New Features
* Error messages for failed payments
* Recurring payments button
* Refreshed UI for friends list and users list on landing page
* Button for paying user requests from the profile page
* Connected Convex database to transaction history to display proper transaction history

### Bug Fixes
* Fixed sorting search bar not sorting on friends list
* Fixed multiple error messages popping up when the failed payment
* Fixed formatting errors when aspect ratio changes

### Known Issues
* Mojaloop peer-to-peer implementation is not available yet in Azure and still requires work from their team before we can implement

---

## Version 0.4.0
### New Features
* Bottom-tab navigation
* Recurring payments page
* Accurate account balance display in profile page

### Bug Fixes
* Fixed dependency error for imported APIs

### Known Issues
* Not able to send real money in app
* Send button in requests page does not change after option is selected; the popup menu is still open when navigating to page again
* Screen formatting is not applicable to all phone types (different screen lengths and widths)

---

## Version 0.3.0
### New Features
* Created request/send funds (money) page
* Created transactions history page
* Created profile page
* Revised search bar to enable touchscreen

### Bug Fixes
* Fixed changes in home and profile page based on smart phone version
* Fixed incorrect dependencies (imports) and node modules in code

### Known Issues
* Not able to send real money in app
* Unavailable node modules that are needed to revise future app UI

---

## Version 0.2.0
### New Features
* Created add / remove friend functionality
* Developed friends list
* Updated UI to closer follow client guidelines and Figma prototype

### Bug Fixes
N/A

---

## Version 0.1.0
### New Features
* create login including username, password, and email
* sign in to app using username and password

### Bug Fixes
N/A

---


## 4/16/2023
We chose to start with the adding friends feature as it is the first step in peer-to-peer payment.  First, the user must create an account and connect with another, then they can send/request a payment.  By requiring users to create an account and using email verification, we can ensure accounts are legitimate. This allows for users to be able to send payments stress-free as we validate users upon creation of their account. There is a search bar at the top of the screen for which users can search accounts. Then, they can add/remove friends quickly by a press of a button.

Future iterations will implement the payment infrastructure that makes the app work.


## Overview of project stack .

Mojaloop is an open-source platform that provides a framework for interoperable digital payments. It is built using modern technologies and is designed to be scalable, flexible, and customizable. It uses the ISO 20022 standard for financial messaging and supports a variety of payment types, including person-to-person, merchant payments, and bill payments. The platform is developed using Node.js and runs on the Microsoft Azure cloud platform.

Microsoft Azure is a cloud computing platform that provides a wide range of services, including virtual machines, storage, databases, and analytics. It supports a variety of operating systems, including Windows, Linux, and FreeBSD. Azure provides a reliable and scalable infrastructure for running applications and services, and it includes built-in security and compliance features.

ReactNative is a popular framework for developing cross-platform mobile applications. It allows developers to write code once and deploy it to both Android and iOS devices. ReactNative uses a combination of JavaScript and native code to create high-performance mobile apps with a native look and feel. It includes a large number of pre-built UI components and third-party libraries, which makes it easy to develop complex mobile applications quickly.

BaaS (Backend as a Service) tools are a set of cloud-based services that provide developers with the infrastructure and tools needed to build and run backend services for their applications. These services include authentication, data storage, analytics, and messaging. BaaS tools simplify the development process by handling many of the infrastructure and operational tasks, allowing developers to focus on building the application logic.

Convex.dev is an ORM (Object-Relational Mapping) database that provides a simple and intuitive way to store and retrieve data. It supports a variety of data types, including text, numbers, and dates, and it includes features like indexing and query optimization to ensure fast and efficient data retrieval.

Cleck.dev is an authentication service that provides secure account creation and management. It includes features like password hashing, two-factor authentication, and social login integration, which makes it easy for developers to add authentication to their applications.

The backend is built using TypeScript, a popular programming language that adds static type checking and other features to JavaScript. TypeScript makes it easier to write and maintain large-scale applications and provides a better developer experience by catching errors at compile time instead of at runtime.
