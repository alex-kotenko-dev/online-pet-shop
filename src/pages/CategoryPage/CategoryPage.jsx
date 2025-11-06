import { CategoryContent } from "../../components/CategoryContent/CategoryContent";
import { useParams } from "react-router-dom";

export const CategoryPage = () => {
  const { id } = useParams()

  return (
    <div>
      <CategoryContent categoryId={id} />
    </div>
  )
}


