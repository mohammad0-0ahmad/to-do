import People from 'frontend/components/Svg/People';
import Lock from 'frontend/components/Svg/Lock';
import Glob from 'frontend/components/Svg/Glob';
import { TaskPrivacy } from 'src/db_schemas';

export const privacyIcons: Record<TaskPrivacy, FC<any>> = {
    public: Glob,
    friends: People,
    private: Lock,
};
