



export class AssignDeviceModel {

    public deviceId: string;
    public standId: string;
    public eventId: string;
    
    constructor(did: string, sid: string, eid: string) {
        this.deviceId = did;
        this.standId = sid;
        this.eventId = eid;
    }
}