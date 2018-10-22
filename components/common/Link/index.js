import { withRouter } from 'next/router'
// style sheets
import css from "Styles/common/link.scss";
/*
** Maintain the SPA approach
** Each of hyperlink must use this higher level component
** Terry Chan
** 22/10/2018
*/
const ActiveLink = ({ children, router, href }) => {

  const handleClick = (e) => {
    e.preventDefault()
    router.push(href)
  }

  return (
    <a href={href} onClick={handleClick} className={css.higherLink}>
      {children}
    </a>
  )
}

export default withRouter(ActiveLink)