import express from 'express';
import AuthMiddleware from '../middlewares/AuthMiddleware';
import { UserRole } from '../constant/user.constant';
import FavoriteCandidateController from '../controllers/FavoriteCandidateController';
import validationMiddleware from '../middlewares/validationMiddleware';
import { addRemoveFavouriteCandidateSchema } from '../validation/favoriteCandidate.validation';

const router = express.Router();

router.post(
  '/add-remove-favourite-candidate',
  AuthMiddleware(UserRole.employer),
  validationMiddleware(addRemoveFavouriteCandidateSchema),
  FavoriteCandidateController.addRemoveFavoriteCandidate
);

router.get(
  '/get-favourite-candidates', 
  AuthMiddleware(UserRole.employer),
  FavoriteCandidateController.getFavoriteCandidates
);


const FavoriteCandidateRoute = router;
export default FavoriteCandidateRoute;