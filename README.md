## AppsForX

AppsForX is a package which you can easily fork for organising your own hackaton. It sets up a website based on OctoberCMS comparable to [2016.appsforghent.be](http://2016.appsforghent.be), including several modules such as a Blog, the ability to create Events, Sessions and Speakers, and a Twitter Wall.

### Requirements

- Apache
- PHP 5.6+
- Some form of SQL database
- mod rewrite

## Getting started

### Step 0: clone repository

After cloning or downloading the repository, you can get started. 

### Step 1: Run composer

First, you’ll want to update the composer requirements. Fetch the repository, and navigate to the directory that contains the repository

`composer install`

### Step 2: Install dependencies

`npm install`

`bower install`


### Step 2: Configure database settings

For your local development server, you’ll want to change the config/database file to your connection information.

`config/database.php`

### Step 3: Migrate the database

`php artisan october:up`

### Step 4: Write access

The following directories need to be writable:

- app/storage
- themes
- uploads

Terminal commands: 

```
chown -R root:www-data app/storage
chown -R root:www-data themes
chown -R root:www-data uploads

chmod -R 775 app/storage/
chmod -R 775 themes
chmod -R 775 uploads
```

### Step 5: Default credentials

You can now access your webpage from the root of your project, and the backend via `root/backend`

Default credentials are:  
Username: admin  
Password: admin  

It is advised you change these ASAP.

### Step 6: Configure Twitterwall

To configure your Twitterwall, go to `themes/appsforghent/assets/vendor/Tweetie/api/config.example.php`

There, fill out your Twitter developer details: consumer_key, consumer_secret, access_token, access_secret

Finally, rename the file to `config.php`

## Features

### AppsForX Modules

There are 5 types of entities that are used by the AppsForX module:

- Events: An event is comparable to the edition of your Hackathon for example (2014, 2015, ...)
    - id
    - name
    - start_date
    - end_date
    - description
    - slug
- Locations: Locations are used when your event has multiple locations where Sessions are happening at the same time.
    - id
    - name 
    - description
- Sessions: A session is a single part of your event, it is linked to Event, Location and Speaker
    - id
    - name
    - start_time
    - duration
    - niveau enum (Beginner, Intermediate, Expert)
    - type enum
    - location_id
    - event_id
    - slug
    - color
    - is_global
    - content
- Speakers: Sessions can have speaker(s)
    - id
    - name
    - priority
    - description
    - twitter
    - linkedIn
    - function
    - organisation
    - website 
- Showcases: Showcases are individual applications which you want to show on your website (for example the projects of last year's event)
    - id
    - name
    - priority
    - description
    - team_name
    - team_members
    - datasets
    - url_presentation
    - url_website
    - url_github
 
**Events**

`plugins/teamswag/appsforx/components/events`

This is the component that will return all Events.

`plugins/teamswag/appsforx/components/sevent`

This is the component that will return a single Event, along with the Sessions that are linked to it.

**Locations**

Locations don't have a component to render them, as they are only used in conjunction with Sessions. 

**Sessions**

`plugins/teamswag/appsforx/components/sessions`

This component will return ALL of the sessions in your system.

`plugins/teamswag/appsforx/components/ssession`

This component will return a single Session in your system, based on the slug, along with extra nformation such as location and speakers for that particular Session.

**Speakers**

`plugins/teamswag/appsforx/components/speakers`

This component will return all the Speakers in your system.

**Showcases**

`plugins/teamswag/appsforx/components/showcases`

This component will return all the Showcases in your system.

**The template for each of these components can be found in the folder within plugins/teamswag/appsforx/components/**_component-name_**/default.htm**  
In order to call a component in a view, all you have to do is call the component in your view, along with additional parameters where required.

Example: `themes/appsforx/pages/session.htm` 

```
title = "Session"       // Title of current page
url = "/session/:slug"  // Route we want to use with parameter slug
layout = "default"      // Base template we want to use
is_hidden = 0           // hide page or not
 
[ssession]              // Load ssession component (single session)
==
<?php
function onStart()      // This code is ran before the base template is rendered, allowing us to define certain variables in the template as well.
{
    $this['page_title'] = 'Session';
    $this['header_bg'] = '/assets/banners/gewoon/banner-26.png';
}
?>
== 
<!-- HTML Starts here -->
<div class="content">
    {% component 'ssession' %}
</div>
```

With this piece of code on top of your page, the application will know which modules to load, as well as (in this case), which Session should be loaded, based on the slug.

`{% component 'ssession' %}` this piece of code will call the template of the component, in this case found in `plugins/teamswag/appsforx/components/ssession/default.htm`

Other components are all analogue with this method.

### Rainlab Blog Module

AppsForX makes use of a slightly modified version of the Rainlab Blog Module, for this reason it is advised to not upgrade the Blog module if you want to retain the (albeit little) extra functionality.

The key difference is that a blogpost can be linked to a certain Session, for the rest it is pretty much the default Rainlab Blog plugin with a modified theme.
