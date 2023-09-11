## Purpose
Branch from https://github.com/rolemadelen/asayake, which was intended to update the old look of the website with a modern design. This repository simply takes the code and prepares it to be deployed on the official Asayake Taiko Website. 

## Key Changes
- Used adapter-static so the site can be statically generated for hosting
- Added keyboard accessibility features
- Updated website photos with recent Asayake photos
- Removed contact form so site can be statically generated

## Installation and Setup
The website only needs to install package-lock.json and package.json, which as long as you have node and npm can be installed with `npm install`. This can also be done with similar programs. To preview locally, simply run `npm run dev`, and to build run `npm run build`. Deploying the website then simply involves uploading the build folder to the UC San Diego Taiko remote server.

## Future Deployments
The previous website designer for Asayake has a well-explained section on deploying the website here: https://github.com/HirotoKakitani/Asayake-website#deploying-the-website. Additionally, UCSD basic instructions can be found here: https://ucsdservicedesk.service-now.com/its?id=kb_article_view&sysparm_article=KB0030548&sys_kb_id=a7d72b1bdbc67bc09736f35aaf961975. Good luck!


Kane Li | MIT License
