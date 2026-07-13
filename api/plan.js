import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

const clean = (v, max) => String(v ?? '').trim().slice(0, max);
export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end();
  const name = clean(req.query.name, 120) || 'tu';
  const score = Math.min(12, Math.max(4, Number(req.query.score) || 4));
  const category = clean(req.query.category, 40) || 'Despegando';
  const pdf = await PDFDocument.create(); const page = pdf.addPage([595, 842]); const bold = await pdf.embedFont(StandardFonts.HelveticaBold); const regular = await pdf.embedFont(StandardFonts.Helvetica);
  const navy=rgb(.035,.09,.17), aqua=rgb(.13,.83,.76), ink=rgb(.06,.13,.23); page.drawRectangle({x:0,y:0,width:595,height:842,color:rgb(.965,.973,.988)}); page.drawRectangle({x:0,y:760,width:595,height:82,color:navy});
  page.drawText('CLOSERFIT', {x:45,y:802,size:13,font:bold,color:aqua}); page.drawText('Tu plan de 7 días', {x:45,y:780,size:27,font:bold,color:rgb(1,1,1)}); page.drawText(`Hola ${name}. Resultado: ${score}/12 · ${category}`, {x:45,y:720,size:15,font:bold,color:ink});
  const days=['Define en una frase el dolor y la transformación que vendes.','Escribe cinco preguntas de calificación para tu próxima llamada.','Crea un guion de confirmación 24 horas antes de cada cita.','Prepara respuestas con preguntas para tres objeciones frecuentes.','Haz seguimiento con un próximo paso y una fecha concreta.','Mide citas, show-ups y cierres de la semana.','Elige una métrica y un hábito para los próximos 30 días.'];
  let y=670; days.forEach((text,i)=>{page.drawRectangle({x:45,y:y-9,width:24,height:24,color:aqua});page.drawText(String(i+1),{x:53,y:y-2,size:12,font:bold,color:navy});page.drawText(`Día ${i+1}: ${text}`,{x:82,y,size:13,font:regular,color:ink,maxWidth:455,lineHeight:18});y-=76}); page.drawText('Gracias por probar mi app. Que te vaya increíble en tu proyecto.',{x:45,y:95,size:12,font:regular,color:rgb(.25,.32,.42)});
  const bytes=await pdf.save(); res.setHeader('Content-Type','application/pdf');res.setHeader('Content-Disposition','attachment; filename="mi-plan-closerfit-7-dias.pdf"');return res.status(200).send(Buffer.from(bytes));
}
