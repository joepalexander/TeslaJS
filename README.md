# TeslaJS
An unofficial Tesla API for NodeJS.

It is important to acknowledge that there are already several very good Javascript libraries available for the Tesla.  So 
why create another one?  I created this library for two main reasons:

1. The anticipated need for a few small but important features that existing libraries did not provide
2. I was looking for a personal opportunity to learn more about the Tesla REST API, Node.js and Github

## Notable Features

With the introduction of the new OAuth-based owner API, one of the features I wanted was the ability to make API calls
without having to login each time.  Once an auth token is retrieved it can be used to make other REST API calls.  This 
is important for moderating load on the Tesla login servers.  This is also important if you want to use the library 
to do server-based data logging.  It is safer to store an auth token on the server than logon credentials.  

Another feature that I wanted was API stateless-ness (achieved via an **options** parameter to API calls) so that it was 
possible to use the library to make multiple overlapping async calls for different vehicles for data-logging.

# Tesla API Documentation

The REST API encapusulated by this library was documented through the work of many Tesla Model S owners.  The current
REST API documentation can be found at:

    http://docs.timdorr.apiary.io/
	
# Warranty Disclaimer

You may use this library with the understanding that doing so is **AT YOUR OWN RISK**.  No warranty, express or implied, 
is made with regards to the fitness or safety of this code for any purpose.  If you use this library to query or change 
settings of your vehicle you understand that it is possible to make changes that could inadvertently lower the security 
of your vehicle, or cause damage, through actions including but not limited to:

* Unlocking the vehicle
* Remotely starting the vehicle
* Opening the sunroof
* Opening the frunk or trunk
* Lowering the battery charge level
* Impacting the health of your battery

# Installation

In order to use the library and/or samples you must first download and install **Node.js** from http://nodejs.org

An installable module for 'npm' is now available.  To download and install the library and all of its dependencies 
to a local project directory use the following:

    npm install teslajs

To download and install the library globally for all node projects use:

    npm install -g teslajs

You may also install directly from the github source.  Either download and unzip the source, or clone the repository.  
Then from the root level of the library directory:

    npm install

# Library Interfaces

The TeslaJS library provides the following methods:

**General API calls**

    setLogLevel() - sets the level of debug logging
	getLogLevel() - gets the level of debug logging
	login() 	  - authenticate with Tesla servers and retrieve the OAuth token
	logout() 	  - delete the current OAuth token
	vehicles()	  - retrieve a list of the vehicles and option data associated with the OAuth token
	
**API calls for a given vehicle id**
	
	vehicleState()     - retrieve the vehicle_state data
	climateState()     - retrieve the climate_state data
	driveState()       - retrieve the drive_state data
	chargeState()      - retrieve the charge_state data
	guiSettings()      - retrieves the GUI settings
	mobileEnabled()    - returns whether mobile access is enabled
	honkHorn() 		   - honks the horn
	flashLights()      - flashes the headlights
	startCharge()      - initiates a charging session
	stopCharge()       - terminates a charging session
	openChargePort()   - opens the charge port
	closeChargePort()  - close the charge port on appropriately equipped vehicles
	setChargeLimit()   - sets the charge limit to a specific amount
	chargeStandard()   - set the charge limit to 90%
	chargeMaxRange()   - sets the charge limit to 100%
	doorLock() 		   - locks the doors
	doorUnlock() 	   - unlocks the doors
	climateStart()     - turn on the HVAC system
	climateStop()      - turn off the HVAC system
	sunRoofControl()   - put the sunroof into a specific state
	sunRoofMove()      - open the sunroof to a specific percent
	setTemps() 		   - set the driver and passenger temperature set points
	remoteStartDrive() - enables remote starting of the car
	openTrunk() 	   - open the trunk or frunk
	wakeUp() 		   - attempt to wake a sleeping vehicle
	setValetMode() 	   - set/reset valet mode
	resetValetPin()	   - reset the valet pin
	startStreaming()   - initiate a streaming data session

The library also exports the following constants:

	streamingPortal  - the URI for the streaming API portal
	portal 			 - the URI for the OAuth-based API portal
	API_CALL_LEVEL 	 - log all API calls
	API_RETURN_LEVEL - log all API calls and completions
	API_BODY_LEVEL   - log calls and completions as well as the body of POST commands
	API_LOG_ALL 	 - the highest level of logging
	streamingColumns - an array of the available streaming columns

Most of the APIs take both an **options** parameter and an optional **callback** function.  The **options** parameter must always
contain a member called **authToken** that contains the OAuth token returned from a successfull **login()**.  For all APIs that 
act on a specific vehicle the **options** parameter must also contain a **vehicleID** member that contains the long vehicle ID value returned
from a successful call to **vehicles()**.

By default the **vehicles()** API returns information on the first vehicle returned.  By providing a **carIndex** member in the
**options** parameter information on a specific vehicle can be queried.
	
# Samples

Several samples are provided in the Examples directory.  These demonstrate some basic usage scenarios for 
the library.  To use the samples first:

    cd Examples

After running the **login** sample an auth token will be cached locally.  If you prefer to avoid keeping an auth token on
your machine, provide login credentials on the command line for each sample.  This will perform a login request and 
keep the token only for the duration of the sample.  The difference lies in whether you are more comfortable with the security 
of a file associated with an account in your file system vs. the visibility of your login credentials in the process 
table for the lifetime of the sample.
	
## login.js

This sample demonstrates the basic login process which returns the Auth token required for other API calls.  The sample
writes out a file called **.token** which stores the Auth token.  Other samples will use this token if present to avoid the need
to enter the **username** and **password**.  If you prefer not to have your Auth token stored locally you can run the samples and provide
the **username** and **password** on the command line.

Usage:

    node login.js <username> <password>

## logout.js

This sample deletes the locally cached **.token** file if present.

Usage:

    node logout.js <username> <password>

## climateStart.js

This sample demonstrates turning on the HVAC system of the vehicle.

Usage:

    node climateStart.js <username> <password>


## climate.js

This sample retrieves and displays data on the HVAC system of the vehicle.

Usage:

    node climate.js <username> <password>

## climateStop.js

This sample demonstrates turning off the HVAC system of the vehicle.

Usage:

    node climateStop.js <username> <password>

## flashLights.js

This sample demonstrates flashing the headlights of the vehicle.

Usage:

    node flashLights.js <username> <password>

## honkHorn.js

This sample demonstrates honking the horn of the vehicle.

Usage:

    node honkHorn.js <username> <password>

## odometer.js

This sample retrieves and displays the current vehicle odometer value.

Usage:

    node odometer.js <username> <password>

## openChargePort.js

This sample sends the command to open the charge port.

Usage:

    node openChargePort.js <username> <password>

## soc.js

This sample retrieves and displays the charge limit, the current vehicle charge level, and the ideal, rated and projected range.

Usage:

    node soc.js <username> <password>

## startCharge.js

This sample demonstrates how to initiate a charging session.

Usage:

    node startCharge.js <username> <password>

## stopCharge.js

This sample demonstrates how to terminate a charging session.

Usage:

    node stopCharge.js <username> <password>

## vehicle.js

This sample retrives and displays several elements of data returned from the **vehicle_state** REST API. 

Usage:

    node vehicle.js <username> <password>

## valet.js

This sample enables or disables valet mode. 

Usage:

    node valet.js <username> <password> ON|OFF pincode

## wakeup.js

This sample sends a wakeup signal to wake a vehicle in sleep mode.

Usage:

    node wakeup.js <username> <password>
