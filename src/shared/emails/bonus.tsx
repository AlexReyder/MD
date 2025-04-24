import { Container, Text } from "@react-email/components"
import { EmailTemplate } from './email-template'

interface Props{
	title: string
	text: string
}
export const BonusEmailFC: React.FC<Readonly<Props>> = ({title, text}) => {
	return (
		<EmailTemplate preview={title}>
			<Container>
							<Text style={paragraph}>
							{text}
							</Text>
				</Container>
		</EmailTemplate>
				
	);
};



const paragraph = {
	lineHeight: 1.5,
	fontSize: 14,
};

const button = {
	backgroundColor:'#055a20'
	,borderRadius:'5px',
	color:'#fff',
	fontSize:'16px',
	fontWeight:'bold',
	textDecoration:'none',
	textAlign:'center' as const,
	display:'block',
	padding:'10px',}
	;