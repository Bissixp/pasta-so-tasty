import { Route, Routes, Navigate } from 'react-router-dom';
import Login from '../pages/login';
import AprrovRecipes from '../pages/approvRecipe';
import Home from '../pages/home';
import Registration from '../pages/registration';
import Perfil from '../pages/perfil';
import Recipe from '../pages/recipe';
import MeatRecipes from '../pages/meatRecipes';
import PastaRecipes from '../pages/pastaRecipes';
import BirdRecipes from '../pages/birdsRecipes';
import BreadRecipes from '../pages/breadRecipes';
import SoupRecipes from '../pages/soupRecipes';
import RecipeDetails from '../pages/recipeDetails';
import NotFoundPage from '../pages/notFound';
import MyRecipes from '../pages/myRecipes';
import MyFavs from '../pages/myFavs';
import PendingApprov from '../pages/pendingApprov';
import SearchRecipes from '../pages/searchRecipes';
import AuthorRecipes from '../pages/authorRecipes';
import EditRecipe from '../pages/editRecipe';

function RoutesPastaSoTasty() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/aprovar-receitas" element={<AprrovRecipes />} />
      <Route path="/home" element={<Home />} />
      <Route path="/registro" element={<Registration />} />
      <Route path="/criar-receita" element={<Recipe />} />
      <Route path="/editar-receita/:recipeIdName" element={<EditRecipe />} />
      <Route path="/carnes" element={<MeatRecipes />} />
      <Route path="/massas" element={<PastaRecipes />} />
      <Route path="/aves" element={<BirdRecipes />} />
      <Route path="/pães" element={<BreadRecipes />} />
      <Route path="/sopas" element={<SoupRecipes />} />
      <Route path="/receita/:recipeIdName" element={<RecipeDetails />} />
      <Route path="/receitas/:authorId" element={<AuthorRecipes />} />
      <Route path="/perfil" element={<Perfil />} />
      <Route path="/minhas-receitas" element={<MyRecipes />} />
      <Route path="/meus-favoritos" element={<MyFavs />} />
      <Route path="/aguardando-aprovação" element={<PendingApprov />} />
      <Route path="/search" element={<SearchRecipes />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
export default RoutesPastaSoTasty;