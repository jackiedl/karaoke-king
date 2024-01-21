import mongoose from 'mongoose';
import SongSchema, {ISongSchema} from '../schema/SongSchema';

const SongModel = mongoose.model<ISongSchema>('songs', SongSchema);

export default SongModel;