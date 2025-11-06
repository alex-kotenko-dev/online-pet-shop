import { Link } from "react-router-dom"
import styles from "./Breadcrumbs.module.css"

export const Breadcrumbs = ({ items }) => {
  const crumbs = [
    { title: "Main page", link: "/" },
    ...(items || [])
  ]

  return (
    <nav className={styles.breadcrumb}>
      {crumbs.map((item, idx) => {
        const isLast = idx === crumbs.length - 1
        return (
          <span key={idx} className={styles.breadcrumbItem}>
            {idx > 0 && <span className={styles.separator}> — </span>}
            {isLast ? (
              <span className={styles.breadcrumbCurrent}>{item.title}</span>
            ) : (
              <Link to={item.link} className={styles.breadcrumbLink}>
                {item.title}
              </Link>
            )}
          </span>
        )
      })}
    </nav>
  )
}



// import { Link, useLocation } from "react-router-dom";
// import styles from "./Breadcrumbs.module.css"


// export const Breadcrumbs = ({ items, customLabel }) => {
//   const location = useLocation()

//   const pathParts = items
//     ? items.map(item => item.title)
//     : location.pathname.split("/").filter(Boolean);

//   const normalizedParts = pathParts.map((part) =>
//     part === "category" ? "Categories" : part
//   )

//   const crumbs = [
//     { title: "Main page", link: "/" },
//     ...normalizedParts.map((part, idx) => {
//       const path = "/" + normalizedParts.slice(0, idx + 1).join("/");

//       const isLast = idx === normalizedParts.length - 1;


//       let title = part;
//       if (isLast && customLabel) title = customLabel;

//       return { title, link: path };
//     }),
//   ]

//   return (
//     <nav className={styles.breadcrumb}>
//       {crumbs.map((item, idx) => {
//         const isLast = idx === crumbs.length - 1;
//         return (
//           <span key={idx} className={styles.breadcrumbItem}>
//             {idx > 0 && <span className={styles.separator}> — </span>}
//             {isLast ? (
//               <span className={styles.breadcrumbCurrent}>{item.title}</span>
//             ) : (
//               <Link to={item.link} className={styles.breadcrumbLink}>
//                 {item.title}
//               </Link>
//             )}
//           </span>
//         )
//       })}
//     </nav>
//   )
// }