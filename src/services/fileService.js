import * as uuid from 'uuid';
import * as path from 'path';

class fileService {

    saveFile(file) {
        const staticPath = path.resolve() + '/client/src/static/'
        try {

            const fileName = uuid.v4() + '.jpg'
            const filePath = staticPath + fileName
            file.mv(filePath)
            return fileName

        } catch (e) {

            console.log(e)

        }
    }

}

export default new fileService();
