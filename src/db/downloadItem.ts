const DataStore = require('nedb-promises');
const path = require('path');
// const Ajv = require('ajv');

type DownloadItemType = {
  paused: boolean,
  recievedBytes: number,
  savePath: string,
  startTime: number,
  state: 'progressing' | 'completed',
  totalBytes: number,
  url: string,
  id: number,
}

class DownloadItemStore {
  public db;

  constructor() {
    // const ajv = new Ajv({
    //   allErrors: true,
    //   useDefaults: true,
    // });

    // this.schemeValidator = ajv.compile()
    const dbPath = path.join(process.cwd(), 'downloadItemDB.db');

    this.db = DataStore.create({
      filename: dbPath,
      autoload: true,
      timestampData: true,
    })
  }

  create(data: DownloadItemType) {
    return this.db.insert(data);
  }

  read(id: number) {
    return this.db.findOne({id}).exec();
  }

  readAll() {
    return this.db.find();
  }

  remove(id: number) {
    return this.db.remove({id});
  }

  update(id: number, data: any) {
    return this.db.update({id}, {
      $set: {
        ...data,
      }
    })
  }

}

module.exports = new DownloadItemStore();
