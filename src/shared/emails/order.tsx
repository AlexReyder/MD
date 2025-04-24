import { Column, Container, Hr, Img, Row, Section, Text } from "@react-email/components"
import { CreateOrder } from '../types/validation/order'
import { EmailTemplate } from './email-template'

interface Props{
	details: CreateOrder
}
export const OrderEmailFC: React.FC<Readonly<Props>> = ({details}) => {
	return (
		<EmailTemplate preview='Заказ оформлен'>
			 <Section
								style={{ ...paddingX, paddingTop: '40px', paddingBottom: '40px' }}
							>
									<Text style={paragraph}>Здравствуйте!</Text>
									<Text style={paragraph}>
									Поздравляем вас с успешным оформлением заказа на нашем сайте! Ваш заказ был успешно обработан и отправлен. Мы очень рады, что вы выбрали именно наш интернет-магазин.
									Для отслеживания статуса доставки вы можете перейти на нашу страницу отслеживания заказов в профиле или связаться с нами по электронной почте или телефону.
									</Text>
						{details.products.map((item) =>{
							return(
								<Container key={item.productId} style={{marginBottom:'20px'}}>
									<Hr style={hr}/>
									<Row>
									<Column>
										<Img
											src={item.image}
											alt={item.name}
											style={{ float: 'left' }}
											width="260px"
										/>
									</Column>
									<Column style={{ verticalAlign: 'top', paddingLeft: '12px' }}>
										<Text style={{ ...paragraph, fontWeight: '500' }}>
											{item.name}
										</Text>
										<Text style={text}>Цвет: {item.color}</Text>
										<Text style={text}>Размер: {item.size}</Text>
										<Text style={text}>Количество: {item.quantity}</Text>
									</Column>
									</Row>
									<Hr style={hr}/>
							</Container>
							)
						})}
							</Section>
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

const paddingX = {
  paddingLeft: '40px',
  paddingRight: '40px',
};

const text = {
	margin: '0',
  lineHeight: '2',
	color: '#747474',
	fontWeight: '500',
};

const hr = {
	 borderColor:'#E5E5E5',
  margin:'0',
}