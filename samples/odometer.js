
"use strict";

require('colors');
var program = require('commander');
const knex = require('knex-pg');
const db = knex({
	client: 'pg',
	connection: {
		host: 'netics.c8va9oyjk6vz.us-east-1.rds.amazonaws.com',
		user: 'postgres',
		password: 'Hilevel1991',
		database: 'assets',
	},
	pool: { min: 0, max: 2 }, // reduce connection pool size
});
const { vehicles, vehicle, vehicleConfigAsync } = require('../teslajs.js');
// const { vehicle, vehicleAsync, vehiclesAsync, getVin } = require('../teslajs.js');
var framework = require('./sampleFramework.js');

//
//
//
program
  .option('-u, --username [string]', 'username (needed only if token not cached)')
  .option('-p, --password [string]', 'password (needed only if token not cached)')
  .option('-U, --uri [string]', 'URI of test server (e.g. http://127.0.0.1:3000)')
  .parse(process.argv);

//
var sample = new framework.SampleFramework(program, sampleMain);
sample.run();

//
//
//
function addCommas(str)
{
	str += '';
	var x = str.split('.');
	var x1 = x[0];
	var x2 = x.length > 1 ? '.' + x[1] : '';
	return x1 + x2;
}

//
//
//



function sampleMain(tjs, options) {
	

	tjs.vehicleDataAsync(options).then( function (vehicleData) {
		var vehicle_state = vehicleData.vehicle_state;
		// console.log(vehicleData.vin)

        // console.log("\nOdometer of vehicle: ");
		// console.log("--------");
		// console.log("\n " + vehicle_state.odometer + ":  " + vehicle_state.vehicle_name)

		var miles = addCommas(Math.round(vehicle_state.odometer));
		// console.log("\n " + miles.green + " mi");
		// console.log(carName)
		const carName = vehicleData.display_name;
		const carVin = vehicleData.vin;
		const carMilage = miles
		// var dataInput = [carName, carVin, carMilage ]
		// console.log("\n" + miles + ", " + vehicle_state.vehicle_name + ", " + vehicleData.vin)
		// console.log(dataInput)
			db('tesla').insert({carName, carVin, carMilage}).then(() => console.log("data inserted" + carVin))
			.catch((err) => { console.log(err); throw err })
				.finally(() => {
					setTimeout(function () { process.exit(); }, 2000);
		});
	});
}
