import s from './AdLine.module.scss'
export default async function AdLine(){
	const data = await fetch(`${process.env.SITE_DOMAIN}/api/ad-line`)
	const content = await data.json()
	return (
		<>
		{
			content?.success?.html ? 
			<div className={`ql-editor ${s.Wrapper}`} dangerouslySetInnerHTML={{__html:content.success.html}}> 
			</div>
			: 
			null
		}
		</>
	)
}