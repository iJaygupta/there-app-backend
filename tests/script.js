'use strict';

require('dotenv').config();
const fs = require('fs');
const chai = require('chai');
const chaiHttp = require('chai-http');
var models = require('./testData/factory');

const assert = chai.assert;
const expect = chai.expect;
const should = chai.should();
var appUrl = process.env.HOST + ':' + process.env.PORT + '/';
chai.use(chaiHttp);
// require('./modules/user/models');



describe(`Testing APIs`, function () {
    this.timeout(15000);

    before(async () => {
        console.log("\n\n ~~~~~~~~~~~~~~~~~ Testing starts here ~~~~~~~~~~~~~~~~~~~~ \n\n");

        let user = await chai.request(appUrl)
            .post('user/login')
            .send({ mobile: '918808974265', password: 'Pass1234' })
        //saving users token into the global object (process.env)
        process.env.token = (user && user.body && user.body.token) ? user.body.token : null;
    });

    beforeEach(function () {
        //opertion to perform before each test(it function) case like database clearout
        // console.log("\n Test begins \n");
    });

    afterEach(function () {
        //opertion to perform after each test(it function) case like storing or logging  test result
        // console.log("\n Test end \n");
    });

    after(function () {
        //gonna exucute after all test cases ends.
        console.log("\n\n  ++++++++++++ Testing Script Successfully Executed ++++++++++++ \n\n");
    });

    /* Inintiating node api tests */
    // console.clear();
    console.log("\n\n ~~~~~~~~~~~~~~~~~THERE APP API(s) TESTING ~~~~~~~~~~~~~~~~~~~~ \n\n");
    // console.log("process.argv[3]", process.argv[3])
    // console.log("process.argv[4]", process.argv[4])

    // console.log(`** Command Syntax:  mocha ./tests {MODULE} {MODEL.js} **`);

    try {
		/** Desc: defining test cases and assigning their callbacks
		 *  Params: {
		 * 		testCases: directory path of the cases to be exicuted
		 * 	}
		 */
        function runTests(testCases) {

            for (var index in testCases) {
                it(testCases[index]['description'], testCases[index]['callback']);
            }
        };


        if (process.argv[4]) {

            var testDir = `${__dirname}/modules/${process.argv[3]}/models/`

            if (process.argv[4] == 'all' || process.argv[4] == '--no-config') { // Running all models tests in the selected module

                if (!fs.existsSync(testDir)) {
                    console.log('\n\n ERROR: Please Select a Valid Module !!\n');
                } else {
                    console.log(`\n\n ~~~~~~~~~ TESTING ALL MODELS OF ${process.argv[3].toUpperCase()} CONTROLLER ~~~~~~~~~ \n\n`);

                    fs.readdirSync(testDir).map((file) => {
                        file.substr(-3) === '.js' ? // Checking for .js files
                            runTests(require(testDir + file)(appUrl, chai, should, assert, models)) : null;
                    });
                }
            } else {

                if (!fs.existsSync(testDir + process.argv[4])) {
                    console.log('\n\n ERROR: Please Select a Valid Module Model!!\n',testDir + process.argv[4]);

                } else {
                    console.log(`\n\n ~~~~~~~~~ TESTING ${process.argv[4].toUpperCase()} MODEL OF ${process.argv[3].toUpperCase()} CONTROLLER ~~~~~~~~~~~  \n\n`);

                    runTests(require(testDir + process.argv[4])(appUrl, chai, should, assert, models)) // Running tests for the specific model

                }
                // if (!fs.existsSync('./modules/' + process.argv[3] + '/' + process.argv[4])) // Incorrect model selected
                //     console.log('\n\n	ERROR: Please Select a Valid Module Model!!\n');
                // else
                //     runTests(require("." + testDir + process.argv[4])(appUrl, chai, should, assert, models)) // Running tests for the specific model
            }


        }

        /* Checking input provided */
        // if (process.argv[4] && false) {  // Checking for the model

        //     var testDir = './modules/' + process.argv[3] + '/tests/';

        //     if (process.argv[4] == 'all') { // Running all models tests in the selected module

        //         fs.readdirSync(testDir).map(file => {

        //             file.substr(-3) === '.js' ? // Checking for .js files
        //                 runTests(require("." + testDir + file)(appUrl, chai, should, assert, models)) : null;
        //         });
        //     }
        //     else {

        //         if (!fs.existsSync('./modules/' + process.argv[3] + '/tests/' + process.argv[4])) // Incorrect model selected
        //             console.log('\n\n	ERROR: Please Select a Valid Module Model!!\n');
        //         else
        //             runTests(require("." + testDir + process.argv[4])(appUrl, chai, should, assert, models)) // Running tests for the specific model
        //     }
        // }
        // } else if (process.argv[3]) { // Checking for module

        // 	/* Running test cases for all modules */
        // 	if (process.argv[3] == 'all') {

        // 		fs.readdirSync('./modules').map(module => { // Reading all module folders
        // 			var testDir = './modules/' + module + '/tests/';

        // 			if (fs.existsSync(testDir)) {

        // 				fs.readdirSync(testDir).map(file => { // Including all controllers
        // 					file.substr(-3) === '.js' ? // Checking for .js files
        // 						runTests(require("." + testDir + file)(appUrl, chai, should, assert, models)) : null;
        // 				});
        // 			}
        // 		});
        // 	} else {

        // 		if (!fs.existsSync('./modules/' + process.argv[3] + '/tests/')) 
        // 			console.log('\n\n	ERROR: Please Select a Valid Module!!\n');
        // 		else {

        // 			/* Displaying options for selecting model  */
        // 			console.log(`\n********** Please select a ${process.argv[3]} model (with .js extension) ********** \n`);
        // 			fs.readdirSync('./modules/' + process.argv[3] + '/tests/').map(model => {
        // 				console.log('==>', model);
        // 			});
        // 			console.log('==> all');
        // 		}
        // 	}

        // } else if(process.argv[2]) { // Checking ./tests command

        // 	/* Displaying options for selecting module  */
        // 	console.log("\n********** Please Select a Module ********** \n");
        // 	fs.readdirSync('./modules').map(module => {
        // 		console.log('==>', module);
        // 	});
        // 	console.log('==> all');
        // }
    } catch (error) { // Catching any possible error
        console.log("Error loading test modules :");
        process.exit(0);
    }

    /*using requst module to simply call node api's,
	use done only when callback happen,don't use it with promise.*/


});
