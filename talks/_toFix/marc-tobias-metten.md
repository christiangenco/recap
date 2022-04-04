---
title: 50 Tactical Tips for running a Low Stress SaaS
speaker:
date: 2021-10-04 13:35:08
conference: europe2021
description: "50 common-sense tips for running your SaaS business"
image:
isPublic: true
---

mtmthemovie
freyfogle

Marc co-runs a geocoding app called [OpenCage](https://opencagedata.com/) with . They launched in Germany in 2015. Their largest customers run several hundred requests every second.

This talk is a collection of common-sense tips largely from femtoconf. Hopefully you can start Monday morning with a single one of these ideas you can work on:

- Include an example invoice on your pricing page so the billing department can verify before buying that the invoice fulfills their requirements
- Put your company address and VAT number in the footer of your marketing page and in every invoice
- Establish credibility and raise your profile by joining associatios (ex: the OpenStreetMap Foundation, Association for Geoinformatics, etc.)
- Create a branding page with your logo for marketing inquiries
- [write a great readme](https://x-team.com/blog/how-to-write-a-great-readme/) for open source libraries
- Sign yourself up for your own product so you're getting the same experience as a regular user (but with a 95% discount). For bonus points give yourself a refund, get your credit card stolen, and run out of funds on your card so you can see the emails your business sends
- Offer pricing in other currencies. You can probably get away with lowering prices in different markets based on currency, like cutting Brazillian prices in half
- Instead of converting from USD to EUR when paid and then back to USD when paying out, use [wise.com](https://wise.com) to create a US bank account and virtual credit card and you can save on currency conversion fees
- Ask Stripe for a discount! Try at least once and you might get a reply back along the lines of "thank you for your email—your new rate is X"
- Track your monthly costs once per quarter. Switch to annual billing if you've been using a service for at least two years.
- Keep 6 months of expenses in cash, or
- Move all invoices to email, let the post office scan your mail or use a service like [scanmailboxes](https://scanmailboxes.com/), and use a digital native accountant
- Keep your monthly bank statements, pay sheets, and tax documents in one digital place (like Dropbox)
- Track MRR, LTV, ARPU, and Churn with [ProfitWell](https://www.profitwell.com/), [ChartMogul](https://chartmogul.com/), or [baremetrics](https://baremetrics.com/). These are surprisingly difficult to calculate by hand. Don't get too lost in analysis here: just focus on the big key numbers.
- Usefathom.com thegeomob.com
- Write a monthly advisor email including key metrics, what you did this month, and what you did last month. Send this to friends, people you've met at confereces, and people you admire in business. Be realistic and honest and you'll maximize how much people can help you. The OpenCage list has about 40 people. If you have a specific question (ex: "has anybody tried facebook marketing?") this is a great pool of people to get advice from.

![Write a monthly advisor email](https://baremetrics.com/)

- Backup your servers and test the restore procedure
- Store your passwords in password managers. If you store them by role (ex: "developer") you can share all passwords with contractors with one action
- Encrypt your laptop, especially if it has any customer data
- Open your calendar for bookings with something like [savvycal](https://savvycal.com/) or calendly
- Check tools like the [ahrefs site audit](https://ahrefs.com/site-audit) for weekly site audits of SEO, banklinks, page speed, and email delivery
- Write automated tests and run them after every commit, before every launch, and at least once a month. [Travis CI](https://www.travis-ci.com/) is helpful here
- Build automated tools to send you report emails
- As soon as you can, hire a freelancer for one day per month to have as a backup software developer. Give them a straightforward task like "run the application." That way if something breaks you already have someone on hand who knows their way around.
- Use standard boring old technology (bootstrap, tailwind, wordpress, etc.) because that increases your hiring pool. It's also faster to develop.
- Pay freelancers as soon as they invoice you and you'll have a competitive advantage vs. other people they work for
- Use quarterly checklists for things like security day, backup day, upgrade day, infrastructure day, and speed day. When something catches you off guard (ex: "there's a new Rails version!"), add it to your standard operating procedure for the checklist that makes more sense.
- Ask "what's the biggest disaster that can happen to your business?" Could [your entire VPS burn down](https://www.reuters.com/article/us-france-ovh-fire-idUSKBN2B20NU)? How long would it take to get back up? Do some planning for events like a network outage, a bank freezing your account, or a key team member quitting.
- Regularly systematically review the support burden. Ask what could be changed so you wouldn't get the types of support requests you're getting (updated docs?)
- Make it obvious how to contact you and set reasonable expectations oh when people can get a response.
- Build a library of support snippets so you're not writing the same emails over and over.
- Don't offer live support. It disrupts your workflow and most questions are answered better either over email or in documentation.
- Fire bad customers.
- Let users self-delete their account. Mark their accounts as deleted, then delete inactive accounts after 6 months.
- Have a GDPR page as a competitive advantage. Many European companies are looking for GDPR-compliancy.
- Add a `note` field to user accounts to add internal notes about your customer.
- Don't add new features unless people are asking for them.

![Gauge interest for features that don't exist already by having a form on the feature's landing page.](https://res.cloudinary.com/genco/image/upload/v1633349533/c/PAtx.png)

- Make sure your front wheel is attached to your bike!
- Have an FAQ search box and store everything people search for. This is a great source of new feature or blog post ideas.
- Have a "did this article help?" button at the bottom of support articles. Look at articles with a lot of negative feedback.
