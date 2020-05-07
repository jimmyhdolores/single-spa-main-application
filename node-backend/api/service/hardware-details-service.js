/**
 * Description: This class is used for getting System Hardware Details.
 */
const promise = require('promise');
const si = require('systeminformation');
var async = require("async");

class SystemInformationDataAcess {

    constructor() {
        console.log('SystemInformationDataAcess');
        this.x;
    }

    /**
     * This static function is used to create a singleton object
     * return type of method is instance of class
     */
    static makeObject() {
        if (!this.x) {
            this.x = new SystemInformationDataAcess();
        }
        return this.x;
    }

    /**
     * This function is used to get System Hardware Data
     * return type of method is promise
     */
    getHardwareDetails() {
        console.log('SystemInformationDataAcess|getHardwareDetails ');
        try {
            let systemHardwareDetails = {
                cpuData: '',
                memoryData: '',
                batteryData: '',
                biosData: '',
                baseboardData: '',
                graphicsData: ''
            }
            const p1 = si.cpu().then((result) => {
                console.log("==========1============");
                return result;
            });

            const p2 = si.mem().then((result) => {
                console.log("==========2============");
                return result;
            });

            const p3 = si.battery().then((result) => {
                console.log("==========3============");
                return result;
            });

            const p4 = si.bios().then((result) => {
                console.log("==========4============");
                return result;
            });

            const p5 = si.baseboard().then((result) => {
                console.log("==========5============");
                return result;
            });

            const p6 = si.graphics().then((result) => {
                console.log("==========6============");
                return result;
            });

            return new Promise((resolve, reject) => {
                Promise.all([
                    p1.catch(error => { return error; }),
                    p2.catch(error => { return error; }),
                    p3.catch(error => { return error; }),
                    p4.catch(error => { return error; }),
                    p5.catch(error => { return error; }),
                    p6.catch(error => { return error; }),
                ]).then(values => {
                    systemHardwareDetails.cpuData = values[0];
                    systemHardwareDetails.memoryData = values[1];
                    systemHardwareDetails.batteryData = values[2];
                    systemHardwareDetails.biosData = values[3];
                    systemHardwareDetails.baseboardData = values[4];
                    systemHardwareDetails.graphicsData = values[5];
                    console.log('final=============== ', systemHardwareDetails);
                    resolve(systemHardwareDetails);
                });
            })
        } catch (err) {
            console.log('Error Occured in SystemInformation|getHardwareInformation ', err);
        }
    }
}
module.exports = SystemInformationDataAcess;