import sendgrid from '@sendgrid/mail';
import { redirect, fail } from '@sveltejs/kit';
import { SENDGRID_API_KEY } from '$lib/env.js';

export const actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();

        // for spam protection
        if(data.get('honey') !== '') {
            return fail(403, {incorrect: true})
        }
        sendgrid.setApiKey(SENDGRID_API_KEY);
        
        const msg = {
          to: 'kaneli200456@gmail.com', // Change to your recipient
          from: 'kal036@ucsd.edu', // Change to your verified sender
          subject: `${data.get('organization')} - Asayake Taiko Performance Request`,
          text: 'Asayake Taiko Performance Request',
          html: `Sent from Asayake Contact Page. <br /><br /> <b>Name</b>: ${data.get('name')} <br /> <b>Phone (optional)</b>: ${data.get('phone')} <br /> <b>Email</b>: ${data.get('email')} <br /> <b>Organization/Event</b>: ${data.get('organization')} <br /> <b>Date</b>: ${data.get('date')} <br /> <b>Time</b>: ${data.get('time')} <br /><br /> <b>Detail</b>: <pre>${data.get('detail')}</pre>`,
        }

        try {
          const sended = await sendgrid.send(msg);
          console.log("sended: ", sended);
          return { success: true };
        } catch(err) {
          console.log(err);
          return { success: false };
        }
	}
};
