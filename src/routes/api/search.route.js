import { Router } from 'express';
import SearchController from '../../controllers/search';

const router = Router();

router.get(
    '/search',
    SearchController.searchArticles
);

export default router;
