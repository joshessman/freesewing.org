import React from 'react'
import useApp from '../../hooks/useApp'
import AppWrapper from '../../components/app/wrapper'

import MdxToc from '../../components/mdx/toc'
import DocsContext from '../../components/context/docs'
import { graphql, Link } from 'gatsby'
import Mdx from '../../components/mdx'
import UpIcon from '@material-ui/icons/KeyboardArrowUp'
import { measurements } from '@freesewing/models'
import MeasurementImage from '../../components/measurements/images'
import PrevNext from '../../components/mdx/prevnext'

const Page = (props) => {
  const app = useApp(false)

  // Add measurement image if needed
  const chunks = props.path.split('/')
  let measurementImage = null
  if (chunks.length === 5 && chunks[2] === 'measurements') {
    let measurement = false
    for (let m of measurements.womenswear) {
      if (m.toLowerCase() === chunks[3]) measurement = m
    }
    measurementImage = <MeasurementImage intl={app.intl} measurement={measurement} />
  }

  const context = [
    <h5>
      <Link to={props.pageContext.up.slug}>
        <UpIcon />
        {props.pageContext.up.title}
      </Link>
    </h5>,
    <DocsContext {...props.pageContext} />
  ]

  const toc = props.data.allMdx.edges[0].node.tableOfContents.items
    ? [
        <h6>{props.pageContext.title}</h6>,
        <MdxToc toc={props.data.allMdx.edges[0].node.tableOfContents} />
      ]
    : []

  return (
    <AppWrapper
      app={app}
      title={props.pageContext.title}
      description={props.data.allMdx.edges[0].node.excerpt}
      crumbs={props.pageContext.crumbs}
      context={context}
      toc={toc}
      active="docs"
      text
    >
      {measurementImage}
      <Mdx node={props.data.allMdx.edges[0].node} offspring={props.pageContext.offspring} />
      <PrevNext previous={props.pageContext.previous} next={props.pageContext.next} />
    </AppWrapper>
  )
}

export default Page

// See https://www.gatsbyjs.org/docs/page-query/
export const pageQuery = graphql`
  query MdxDocsPage($file: String) {
    allMdx(filter: { fileAbsolutePath: { eq: $file } }) {
      edges {
        node {
          body
          excerpt
          tableOfContents(maxDepth: 4)
        }
      }
    }
  }
`
