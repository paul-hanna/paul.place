// ─── ANALYTICS HELPERS ───
// Safe wrapper — won't error if gtag hasn't loaded or is blocked
function track(event, params) {
  if (typeof gtag === 'function') gtag('event', event, params);
}

function trackPageView(path, title) {
  if (typeof gtag === 'function') {
    gtag('event', 'page_view', {
      page_path: '/' + (path || ''),
      page_title: title || document.title,
      page_location: window.location.origin + '/' + (path || ''),
    });
  }
}

let viewStart = null;
let currentView = null;

function startViewTimer(viewName) {
  // flush previous view's time
  if (currentView && viewStart) {
    const seconds = Math.round((Date.now() - viewStart) / 1000);
    track('view_duration', {
      view_name: currentView,
      duration_seconds: seconds,
    });
  }
  currentView = viewName;
  viewStart = Date.now();
}

// track time on page when user leaves
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'hidden' && currentView && viewStart) {
    const seconds = Math.round((Date.now() - viewStart) / 1000);
    track('view_duration', {
      view_name: currentView,
      duration_seconds: seconds,
    });
  }
});

startViewTimer('home');

// ─── PANEL CONTENT DATA ───
// Each item can have:
//   title, sub, description, tags[]
//   image: 'assets/thumb.jpg'           — single hero image (also used as list thumbnail)
//   images: ['assets/1.jpg', ...]       — gallery (first image is used as list thumbnail)
//   embed: 'https://player.vimeo.com/video/ID'  — video embed
//   link, linkLabel                      — external link
const sections = {
  film: {
    title: 'Film',
    description: 'Narrative, experimental, and commercial directing work.',
    items: [
      {
        title: 'Vellum Product Launch',
        sub: 'Director, Writer, Soundtrack · 2026',
        tags: ['Commercial', 'Director', 'Writer'],
        embed: 'https://player.vimeo.com/video/1154409548?badge=0&autopause=0&player_id=0&app_id=58479',
        image: 'images/works/vellum-product-launch.png',
      },
      {
        title: 'FALLOUT',
        sub: 'Low.bō · Director, Producer, Editor · 2025',
        tags: ['Music Video', 'Director'],
        embed: 'https://www.youtube.com/embed/qzZZQFI49PU?autoplay=1',
        image: 'images/works/fallout.png',
        images: ['images/works/fallout-gallery-1.png','images/works/fallout-gallery-2.png','images/works/fallout-gallery-3.png','images/works/fallout-gallery-4.png','images/works/fallout-gallery-5.png','images/works/fallout-gallery-6.png','images/works/fallout-gallery-7.png','images/works/fallout-gallery-8.png','images/works/fallout-gallery-9.png','images/works/fallout-gallery-10.png','images/works/fallout-gallery-11.png','images/works/fallout-gallery-12.png'],
      },
      {
        title: 'Alchemical',
        sub: 'Rachel Bochner · Director, Editor · 2024',
        tags: ['Music Video', 'Director'],
        embed: 'https://www.youtube.com/embed/wJqFHxVUhOg?autoplay=1',
        image: 'images/works/alchemical.png',
      },
      {
        title: 'rightwhereyouwantme',
        sub: 'Issadora Ava · Director, Producer, Editor, Colorist · 2025',
        tags: ['Music Video', 'Director'],
        embed: 'https://www.youtube.com/embed/FrSuiM0eRH8?autoplay=1',
        image: 'images/works/rightwhereyouwantme.png',
        images: ['images/works/right-where-you-want-me-gallery-1.JPG','images/works/right-where-you-want-me-gallery-2.JPG','images/works/right-where-you-want-me-gallery-3.JPG','images/works/right-where-you-want-me-gallery-4.JPG','images/works/right-where-you-want-me-gallery-5.JPG','images/works/right-where-you-want-me-gallery-6.JPG','images/works/right-where-you-want-me-gallery-7.JPG','images/works/right-where-you-want-me-gallery-8.JPG','images/works/right-where-you-want-me-gallery-9.JPG','images/works/right-where-you-want-me-gallery-10.JPG','images/works/right-where-you-want-me-gallery-11.JPG','images/works/right-where-you-want-me-gallery-12.JPG'],
      },
      {
        title: 'O Superman',
        sub: 'Writer, Director, Producer, Editor · 2023',
        tags: ['Short Film', 'Director', 'Writer'],
        embed: 'https://player.vimeo.com/video/876499156?h=f2739fc14d',
        image: 'images/works/o-superman.png',
      },
      {
        title: 'Creative Liberties',
        sub: 'Rachel Bochner · Director, Producer, Editor · 2024',
        tags: ['Music Video', 'Director'],
        embed: 'https://www.youtube.com/embed/9AQtCG8GiHY?autoplay=1',
        image: 'images/works/creative-liberties.png',
      },
      {
        title: 'The Unavailable Memory of',
        sub: 'Writer, Director, Editor, Producer · 2022',
        tags: ['Short Film', 'Director', 'Writer'],
        embed: 'https://www.youtube.com/embed/sNvlb8ZQYLA?autoplay=1',
        image: 'images/works/unavailable-memory.png',
      },
      {
        title: 'Free Money',
        sub: 'Film',
        link: 'https://insigniafilms.com/Free-Money',
        linkLabel: 'View',
        image: 'images/works/free-money.png',
      },
      {
        title: 'Hallway',
        sub: 'Writer, Director, Editor · 2023',
        tags: ['Short Film', 'Director'],
        embed: 'https://www.youtube.com/embed/TpkrhPAQSlM?autoplay=1',
        image: 'images/works/hallway.png',
      },
      {
        title: 'Movies in the Daytime',
        sub: 'Isa Bruder · Director, Producer, Editor · 2025',
        tags: ['Music Video', 'Director'],
        embed: 'https://www.youtube.com/embed/Z2kKyP2e-Hk?autoplay=1',
        image: 'images/works/movies-in-the-daytime.png',
        images: ['images/works/movies-in-the-daytime-gallery-1.png','images/works/movies-in-the-daytime-gallery-2.png','images/works/movies-in-the-daytime-gallery-3.png','images/works/movies-in-the-daytime-gallery-4.png','images/works/movies-in-the-daytime-gallery-5.png','images/works/movies-in-the-daytime-gallery-6.png','images/works/movies-in-the-daytime-gallery-7.png','images/works/movies-in-the-daytime-gallery-8.png','images/works/movies-in-the-daytime-gallery-9.png'],
      },
      {
        title: 'Absence',
        sub: 'Writer, Director, Editor · 2024',
        tags: ['Short Film', 'Director'],
        embed: 'https://www.youtube.com/embed/d-2IfeDv95o?autoplay=1',
        image: 'images/works/absence.png',
      },
      {
        title: 'You, Me, and Her',
        sub: 'Black Hibiscus · Producer · 2023',
        tags: ['Music Video', 'Producer'],
        embed: 'https://www.youtube.com/embed/8yCKJpMeSPQ?autoplay=1',
        image: 'images/works/you-me-and-her.png',
      },
      {
        title: 'Circonstances',
        sub: 'Director, Cinematographer, Editor · 2022',
        tags: ['Short Film', 'Director', 'DP'],
        embed: 'https://www.youtube.com/embed/kKkkDe9-Q2s?autoplay=1',
        image: 'images/works/circonstances.png',
      },
      {
        title: 'Monday',
        sub: 'Writer, Director, Editor, Producer · 2021',
        tags: ['Short Film', 'Director'],
        embed: 'https://www.youtube.com/embed/xoj-ExKy6hg?autoplay=1',
        image: 'images/works/monday.png',
      },
      {
        title: 'Jersey in July',
        sub: 'Dom Innarella · Production Coordinator · 2025',
        tags: ['Music Video', 'Production'],
        embed: 'https://www.youtube.com/embed/SD-hi9vG0O8?autoplay=1',
        image: 'images/works/jersey-in-july.jpg',
      },
      {
        title: 'Proud of Me',
        sub: 'Eva Westphal · Producer · 2023',
        tags: ['Music Video', 'Producer'],
        embed: 'https://www.youtube.com/embed/2zCubXGT2gY?autoplay=1',
        image: 'images/works/proud-of-me.png',
      },
    ]
  },
  multimedia: {
    title: 'Multimedia',
    description: 'Experimental video, web art, installation, and interactive work.',
    items: [
      {
        title: 'Waiting, Leaving',
        sub: 'Web art',
        link: 'https://paul.tube/waitingleaving/',
        linkLabel: 'View',
        image: 'images/works/waiting-leaving.jpg',
      },
      {
        title: 'Notes from Underground',
        sub: 'Web art',
        link: 'https://oral.pub/notes/',
        linkLabel: 'View',
        image: 'images/works/notes-from-underground.jpg',
      },
      {
        title: 'Disposal',
        sub: 'Paul Hanna & Maya Castronovo · 2024',
        description: 'Filmed at Shirley Chisholm State Park, site of the defunct Fountain Avenue Landfill in Brooklyn. From 1961 to 1985, the landfill received hundreds of thousands of tons of trash and illegal hazardous waste. The film\'s cyclical, embodied camera encourages us to consider how violence is encoded within the landscape itself. By refusing conventional cinematic closure, Disposal situates these traces of violence within frameworks of ecological restoration and renewal.',
        tags: ['Experimental'],
        embed: 'https://player.vimeo.com/video/942757123?badge=0&autopause=0&player_id=0&app_id=58479',
        image: 'images/works/disposal.png',
      },
      {
        title: 'Translated',
        sub: 'FFMPEG, OCR, spectrograms, TTS · 2025',
        description: 'This piece features FFMPEG text-to-video translations, OCR, spectrograms, and TTS.',
        tags: ['Data Translation', 'Experimental'],
        embed: 'https://www.youtube.com/embed/dgcPde-KUTI?autoplay=1',
        image: 'images/works/translated.png',
      },
      {
        title: 'News Tomorrow',
        sub: 'Web art',
        link: 'https://paul.tube/news-tomorrow/',
        linkLabel: 'View',
        image: 'images/works/news-tomorrow.png',
      },
      {
        title: 'Panopticon',
        sub: 'Web art',
        link: 'https://paul.tube/multiscreen/panopticon/',
        linkLabel: 'View',
        image: 'images/works/panopticon.png',
      },
      {
        title: 'Spectrograms of my mother at her wedding',
        sub: 'Image to sound to image process · 2025',
        tags: ['Experimental'],
        image: 'images/works/spectrograms.png',
        video: 'spectrograms.mp4',
        galleryCols: 3,
        images: ['images/works/spectrograms-of-my-mother-gallery-1.png','images/works/spectrograms-of-my-mother-gallery-2.png','images/works/spectrograms-of-my-mother-gallery-3.png'],
      },
      {
        title: 'I Know it When I See It',
        sub: 'Resin cast, Sylvania television, antenna, foam · 2023',
        tags: ['Sculpture', 'Installation'],
        image: 'images/works/i-know-it-when-i-see-it.jpg',
        images: ['images/works/i-know-it-when-i-see-it-gallery-1.jpg','images/works/i-know-it-when-i-see-it-gallery-2.jpg','images/works/i-know-it-when-i-see-it-gallery-3.jpg','images/works/i-know-it-when-i-see-it-gallery-4.jpg','images/works/i-know-it-when-i-see-it-gallery-5.jpg','images/works/i-know-it-when-i-see-it-gallery-6.jpg','images/works/i-know-it-when-i-see-it-gallery-7.jpg','images/works/i-know-it-when-i-see-it-gallery-8.jpg','images/works/i-know-it-when-i-see-it-gallery-9.jpg','images/works/i-know-it-when-i-see-it-gallery-10.jpg'],
      },
      {
        title: 'Tower of Babel',
        sub: 'BRIC + NYC Data x Design exhibition · with Aida Razavilar',
        tags: ['Installation', 'Exhibition'],
        image: 'images/works/tower-of-babel.jpeg',
        description: 'Exhibited at Data by Design 2025 at BRIC. An interactive installation in which visitors select any New York City community district via pushbutton. A generated creole\u2014derived from the three most spoken diaspora languages in that district, weighted by their relative distribution\u2014appears on an e-ink display, accompanied by a text-to-speech voice narrating the district\u2019s history in the new tongue. The work imagines a city unmoored from English as its default, proposing a speculative future in which linguistic exchange, rather than assimilation, shapes how communities speak and remember.',
      },
      {
        title: 'America Kept its Word',
        sub: '2024',
        embed: 'https://www.youtube.com/embed/bMIkaV6jo7Q?autoplay=1',
        image: 'images/works/america-kept-its-word.png',
      },
      {
        title: 'Can We Bring Them Back',
        sub: '2023',
        description: 'I have always been particularly moved when I\'ve happened across a dead animal. In the city, birds are the most common. They spend most of their time in open air, unrestricted. Rats you find less often. As a child, I cried each time I saw a finch sprawled out in a field and prayed to God that the bird would stand back up and fly away. I still feel that way.',
        embed: 'https://www.youtube.com/embed/UYHwQlAasFk?autoplay=1',
        image: 'images/works/can-we-bring-them-back.png',
      },
      {
        title: 'Passage',
        sub: '2023',
        embed: 'https://player.vimeo.com/video/856221377?h=6f48b3fef0',
        image: 'images/works/passage.png',
      },
    ]
  },
  writing: {
    title: 'Writing',
    description: 'Screenplays, poetry, and journals.',
    items: [
      {
        title: 'Fiction and Screenplays',
        sub: 'Short stories, pilots, and features',
        group: true,
        children: [
          {
            title: 'Jannah',
            sub: 'TV Pilot',
            tags: ['Screenplay', 'Pilot'],
            bodyType: 'prose',
            body: `<p>A failing Arab-American poet discovers his late grandfather's unfinished play and becomes haunted by his ghost, who pushes him toward artistic success that may cost him his integrity.</p><p style="margin-top:1.5rem;font-size:0.8rem;opacity:0.6;">For the full screenplay, contact <a href="mailto:paul@paul.place" style="color:#c43d14;">paul@paul.place</a></p>`,
          },
          {
            title: 'Ivory',
            sub: 'Feature',
            tags: ['Screenplay', 'Feature'],
            bodyType: 'prose',
            body: `<p>A museum curator lets a professor die to steal proof of a forged artifact, then must navigate Iraqi repatriation demands while caught between institutional loyalty and a violent collector\u2014ultimately becoming the sole keeper of a truth no one wants.</p><p style="margin-top:1.5rem;font-size:0.8rem;opacity:0.6;">For the full screenplay, contact <a href="mailto:paul@paul.place" style="color:#c43d14;">paul@paul.place</a></p>`,
          },
          {
            title: 'Unlocked',
            sub: 'TV Pilot',
            tags: ['Screenplay', 'Pilot'],
            bodyType: 'prose',
            body: `<p>A failed artist-turned-tech-founder builds an AI that promises creative breakthroughs but publicly exposes a user's darkest secrets, forcing him to choose between spinning disaster into success or confronting what his technology actually does.</p><p style="margin-top:1.5rem;font-size:0.8rem;opacity:0.6;">For the full screenplay, contact <a href="mailto:paul@paul.place" style="color:#c43d14;">paul@paul.place</a></p>`,
          },
          {
            title: 'Probably Just as Much, Maybe More',
            sub: 'Short story',
            tags: ['Fiction'],
            bodyType: 'prose',
            body: `<p>I wake up and there's a notification on my phone—some actor went and offed himself. The Guardian says they don't want to speculate, the New York Post says it was a hanging, a noose dusted with cocaine and glitter, some liberal propaganda. I really can't believe it, and not because it's too morose or anything like that. I'm used to this stuff. As a matter of fact, I'm actually thinking about ending it probably just as much, maybe more, than that sorry guy ever did.</p>

<p>I'm standing in my bathrobe in my kitchen and I give my lawyer a call and ask him if my will's still intact. He says to me, of course, Theo, it hasn't changed a bit. I say to him, thanks for that, and he asks if everything is alright. I don't respond for a second and then I tell him that it's all great before I hang up.</p>

<p>I've got the day off work, the lucky duck I am, and I'm home by myself. Brent's at school, probably real lost about what two and two equals. In both cases it's four, I tell him time and again, doesn't matter if you multiply or add, but it doesn't ever stick, and he finishes unwrapping another crayon in its entirety for no discernible reason. Brent's a sensitive kid—I'm sure if he could read the news today he'd be beside himself.</p>

<p>I sit down at my kitchen table and start to write on a loose sheet of paper, <em>to all who have ever loved or known me</em>. That's a little melodramatic, so I try less sappy: <em>to those that this concerns</em>. I think both of these are pretty unremarkable, so I figure I have writer's block and decide to browse the web in hopes that I'll be spurred to write something beautiful. Woolf started her note with "dearest" but I don't love Mina enough to dedicate the entire goodbye to her.</p>

<p>I type "Virginia Woolf suicide?" into Google just to get some of the details, and it says she filled her pockets with stones and jumped into a river. Drowning looks to be a rotten way to go if you ask me. So I write that down on a new sheet of paper and immediately cross it out.</p>

<p>I reach a point where I'm scrolling through a Wikipedia page filled with 21st century suicides, and the reasons seem to be depression, drugs, molestation charges, or some combination of the three. There are a couple folks who set themselves on fire for political reasons but I don't feel strongly about anything in the news today so I cross that off the list too.</p>

<p>I call my lawyer again and I ask him if he needs me to sign the will. He says to me, Theo, you've already signed it. Of course I've signed it. I say that I've got a new signature, something more stately, more presidential. He asks me what all the fuss is about. I tell him that I'm trying to take everything in my life more seriously. He says, Theo, what with all this talk it sounds like you're about to kill yourself. I laugh and I tell him that the thought has crossed my mind but I'm in a better place now. He doesn't say anything to that and I hear this long exhale. I tell him I've got to run and he says goodbye now.</p>

<p>I grab my keys and step outside and hop into my 2009 Honda Accord. It should take me twenty-two minutes to get to Kroger. Ten minutes in, I'm on this two way road and I keep thinking about veering into oncoming traffic. The thing is, I haven't finished writing my note so it might look like a total accident, and it may be very painful. Sometimes people survive car accidents with a couple of broken bones and sometimes the car sets itself on fire and flambés everyone within ten feet of it. I have already decided I do not want to self-immolate, so I keep driving to Kroger.</p>

<p>I'm trying to back into a parking space when I spot Brent's crusty elephant plush in the back seat. Brent's a toother, he toothes on this thing—it's disgusting. The elephant looks like a balding man in his fifties who has just lost his house and car betting it all on red in Vegas. I once asked Brent what he named the elephant. He stammered and shouted, Theo! His name is THEO! Brent doesn't know that my name isn't dad so I try not to take it personally.</p>

<p>I go through the aisles with a shopping cart. Eggs aren't as expensive as they used to be. I think about calling Mina to tell her, then don't, and leave the eggs in the fridge. I push my cart forward without looking and bump into an employee. Before he can say anything I ask him if he's got any rope in stock, that I've got a project I'm working on. He asks me what the project is. I can't think of anything fast enough and I tell him I'm building a house. He gives me a dumbfounded look and says that this might not be the right place to buy house-building materials.</p>

<p>I tell him that I'm also looking for nonhouse-building rope. He says he might have some and tells me to follow him. We walk towards the gardening section and he tells me that if it's anything heavy duty I'm probably better off going to a Home Depot because the best thing I could do with the rope they've got in store is grow some pea plants or try to tie a bundle.</p>

<p>I tell the guy that I think Epstein was probably killed with rope of that thickness. It was almost like a wire. The guy looks at me and can't seem to respond. I say, come on, don't tell me you think he actually killed himself. There wasn't even blood on the sheet that was found around his neck! You figure he'd bleed onto the very thing that caused the bleeding. I can't stand it with the justice department saying whatever it is about suicide. You know he had bail coming up? His lawyers said he wasn't even depressed. Hell, I've got more reason to kill myself than he does.</p>

<p>The employee's staring at me now and I reach for the rope. He stutters and says to me o-o-okay sir, I hope that was what you were looking for, before sprinting to another aisle. I take a closer look at the rope and it's more of a twine and I figure it won't do—it won't support my weight. If I'm going to hang myself it's got to be definite, no maybes or perchances. I wander around the aisle some more and my eyes glaze past the shovels, terracotta pots, the sunflower seeds, and land on some rat poison.</p>

<p>I pull out my phone and Google "how much rat poison to kill a man." This site called RatPoisonFacts.org says I'd need to eat a lot of the stuff, dozens and dozens of boxes worth. I size up the different bags and seriously consider the thought but I realize quickly that I'd need to shovel pounds of poisonous rat bait into my mouth before anything might happen. I'm not opposed to the idea of poisoning, but I'd like to leave room for a last meal or snack and I think this rat poison might taste abhorrent. And, if I'm not careful, Brent might find me, post-poison, and eat some of it. I don't want Brent to eat rat poison, because I know he will, even if he realizes it's bad for him and in fact meant for rats.</p>

<p>I'm leaving the gardening section with an empty cart and I stare at this bag of charcoal briquettes. The bag's on fire, or at least it's designed to look that way. I can't help but stare at the flames and think about the eternal pain of those who are on fire right now. Searing and searing until their bodies give out wholly. No, I certainly could not do that. I shift my attention to a box containing a putting green meant for guys in suits to put next to their cubicles.</p>

<p>I call my lawyer again and ask him if he's remembered to add the bit where in my passing I'd give Brent all of my golf clubs. My lawyer says, Theo, Theo—if you're so concerned about this will, let's find a time to meet, let's look it over, you sound anxious. I tell him that I am not anxious, I'm being prudent, and that those golf clubs are worth a great deal and I'd hate for them to be the center of a postmortem rift among my family members with little Brent unable to stand up for himself given he's a dolt. My lawyer says Theo, isn't the kid three? How much of a dolt can he be? I tell him more of a dolt than you can believe, and I hang up.</p>

<p>Now you might be wondering, Theo, what about a gun? Have you thought about using a gun? A giant, double barrel shotgun, like Hemingway? That must be effective—the mortality rate there is pretty high.</p>

<p>Well, I don't want to condone violence. I like to set a good example for my kid, you know. And I'm a lousy shot. I'd probably need to shoot a couple times and by that point I'm sure my neighbors might think there's a gunfight in my home, come to investigate, and see me still sitting with the double barrel clean in my mouth trying to figure out how to reload the damn thing. I don't own a gun.</p>

<p>I walk past the cash registers with my empty cart and drive home. A little while later, Brent and Mina are there. Brent comes up to me in the living room while Mina's taking a shower and he gives me this look, an opossum-like stare. I say to him, what's with you? Don't you know I'm horribly depressed? And Brent says to me, Theo, you revel in melancholy. You're deeply obsessed with the romance behind killing yourself but you'll never act on it. You'll never be a martyr. I say back, well, Brent, what do you know about reveling in melancholy? Ever since your mother started that new job at Deloitte I have this sneaking suspicion that she's having an affair with Jeff, that temp. That makes me melancholic.</p>

<p>Brent says, Theo, she'd never do that to you. She's a devoted wife. You know, Camus says that there is but one truly serious philosophical problem, and that is suicide.</p>

<p>I say, yes, sure, that's dogmatically true.</p>

<p>Mina walks out of the bathroom with wet hair and says hello dear. I say, hello Mina, and give her a kiss on the cheek. Brent walks up to me and hands me a slimy red crayon with teeth indentations. Mina asks him what two and two makes. Brent sputters a bit before saying th-th-th-th-threeeeeeeee.</p>`,
          },
        ],
      },
      {
        title: 'Poetry',
        sub: 'Selected poems',
        group: true,
        children: [
          { title: 'Next time', sub: '2024', bodyType: 'poetry', body: `Next time you spit upon the streets of the West Village
because the patterns around my neck
imply a form of savagery,
spit at me clearly

Allow yourself the satisfaction
of seeing your rotten droplets singe my eyebrows
and allow yourself the Liberty
to divisively exist as yourself

It is your right to trod down these sidewalks
Your right to step on any crack you see
(God bless your mother)

This is a melting pot filled with your spittle,
in which you are free to paddle as you please

I have been aware of these certain rights
since Mrs. Butterfield outlined them in crayon
and I have embraced them flagrantly
after months of mirror rehearsals

Next time you spit, be so brash as to spit into my face
Proudly emphasize your place in New York--
Barefaced, holler, "This is my town!
Move there why don't ya if you like it so much!"

Be so kind and allow me to hate you
with a Manichaean passion
just by laying my eyes upon you

I have expressed myself ever so clearly
despite the splutter

Next time please feel comfortable enough
to do the same` },
          { title: 'Cafeteria', sub: '2024', bodyType: 'poetry', body: `For on certain days,
when your heart beats
                                        with an unusual cadence
and your hands, wrists, forearms
                                        tremble so that the prongs
make for a futile spoon-attempt to eat spring medley--

You look deep into the eyes of someone that
               has reflexively eaten their salad across the hall
brimming with an unabashed and
                                                    automated satisfaction,
as if they have reached the
                             nominal end of some nominal journey
For which you blame perhaps a sharper fork or
                                               the rapidity of consumption


As for me, I don't think such stasis has generously
given me the time or the laminated certificate

For on certain nights,
I wake up to the pounding
                                            of masses of roaches within
looking for a dollar or a place to stay,
                                    yet all my things remain in my room
to offer me some continuity

I have this spoon in some drawer somewhere,
                            second-hand hemoglobic scent
I think of all the mouths it has seen,
                        the hands exchanged over years,
and the calcified remnants of an apple tart


And if you can't finish the salad,
                              can you hold onto your seat?` },
          { title: 'Fifteen Matches', sub: '2022', bodyType: 'poetry', body: `Fifteen matches to light one cigarette
never did understand how they worked
or how the leagues blew and the pages
keep turning always to some entry, DEC
12, memory, a lengthy break from cursive,
caught in the breeze

Structures of red and iron are still,
never did understand how Miss Otis's
feeble gales couldn't shake the gantry

Always in a hurry and why not,
enter the concrete spit slurry
and feel it like sweaty sheets.
You'll see that the unjustified sprinter
feels like breathing until gasping

No, I'll not be in Hollywood
could never run that fast
when you're there find Christ sit still
and take the vortextual bloodsuckers
to the sinks. See how you scratch
in the pews.

Never did understand the atom shake
hum drum muffle of old Chevy at harbor
when it's out smoke another but before dip
your rugged fingers into the air for a minute` },
          { title: 'Lux Aeterna', sub: '2023', bodyType: 'poetry', body: `Twelve thirty across the Pacific is not the same.
Words whirlwinding, divorced from my window seat
As trunks shuffle on and off, grating and screaming.
There are so many people in this city, and where
Do they all come from.

It's the train again, but you're in the seat next to mine
Or a cafe, right across. Three cameras all useless
Exposed to you, beacon on the road, but I can
See you perfectly despite the light. To think I
Had forgotten my lenses in my suitcase too.
I've seen this before, brief glimpses of pictures
On gallery walls. Begrudged images, though
I couldn't capture them.

Duty to complete, dying when it's done
And you're already curating your funeral playlist?
Kennedy never got to listen to Mozart as they
Set his memory ablaze. Perhaps I'll find myself
Across the sea, abroad, but here I spend time with
The bay and some vinyl records, finding instead
That I'm rooted in all that has preceded me.

And your ears were always so astute.
Don't think I can forget their shape, despite
The grain on that photograph. I've tried
To describe it, pointing to each speck of
Dust on the negative, but they've already
Shifted the reel. More interested
In those travelogues.

Have this habit of listening to songs
Until they sound like static. I'm trying
To reconstruct that melody I said
I'd play. It sounded pretty then. Think
It would sound pretty soon.` },
          { title: 'Sharuunaqia', sub: 'Michigan Quarterly Review · 2022', bodyType: 'poetry', body: `we cannot understand what you are saying
show us the word instead
                                                  I turn
my phone their eyes fixate on the Arabic
pupa they pull it closer (they have forgotten
to wear their reading glasses)
                                                         ibne, you
mean sharnaqa? you have been saying
sharuunaqia -- that is the problem
with translation apps Arabic is not
a robotic language you must feel it

it is an Alwazah earl grey tea bag wrapper stolen
by inclement weather I left it unattended for
a single moment of conversation with Shawn
the gun has sounded the bag has lapped me
and my father is on the sidelines he screams
yallah my son it is time to catch up or you will not
finish this race and now I am chasing after it though
it flits faster than I am able to run I fall behind

I must admit I have saved many encyclopedia
entries and recipes and dates on my computer
because I cling to them in hopes that I will
become my hard drive
                                        here is one Kha b-Nisan
it is the new year for my village we are meant
to recite the Enuma Elish in ancient Assyrian

I must admit I do not know what these words
mean but I am aware that I am meant to celebrate
the 6771st anniversary of our earth and Ashur
but this may be a passing thought for the lamb
tastes the same regardless of our recitation

I am looking at the New York Times Barbara
Kafka is presenting me with a recipe for grape
leaves she tells me it is a nice and exotic dish
from the Mediterranean so I follow her directions
in my college dorm but they taste foreign

perhaps if I had called them dolma and
perhaps if I had added some cardamom despite
              Mrs. Kafka telling me otherwise and
perhaps if I had prepared them in a deep pot and
perhaps if my mother had made them for me
they may have tasted like tradition

but Barbara she cannot impart this wisdom
upon me she cannot inject my instincts
with Wikipedia articles and English recipes
and even monarchs remember their unwinged pasts
in the in-between goop of their cocoons

I must admit that I think I will hatch eventually
but the only remnants of my larval period
will be befuddlement and regret` },
          { title: 'Sweet Dumpling', sub: 'Michigan Quarterly Review · 2022', bodyType: 'poetry', body: `looming over the island I have just uncovered
the Italian secrets of the pasta roller
ravioli is but a dumpling in the grand scheme
of cuisine and what is better than globalization
so I ask my mother if she knows how to make
luqaimat and she tells me that she had made
them once as a child but it was more convenient
to buy the sticky rounds encased in a Styrofoam
and plastic-wrap membrane from Khalid
across the road

                                today is the day I will out-Arab
my mother I fill a vat with canola oil
four-hundred degrees and silent it awaits
the brigade of yeast and flour fighters
they storm the surface floating and
battle waging there was not one grand
shot to be heard around the world but many
shots only audible to the dust mites who creep
in the cupboards of our suburban kitchen

my mother tells me to step back she says
that hot oil is equally unsympathetic to all clothes
my striped oxford shirt is too precious to
lose as she agitates the oil it grows frustrated

the invaders cannot bear the desert heat they
click and pop but do not deter my mother she
holds her ground threatening with a slotted spoon

the vat retaliates it rejects these strange
soldiers my mother she has been hit
a casualty of this war she disengages
the knobs of the stove and though
she is a betsy red and dressed in injury
she saves me from flames her cheeks and brow rosy
blistered bulbous I am unafflicted crying
but she is silent I sprint for our window
plant and apply aloe and panicked tears to her face

I cannot grasp the atrocities of war I have
lived in Michigan and I have expected the national
guard or the marines to defend me and my mother
is not a member of the armed corps but she has
suffered all the same protecting us from the
consequences of scalding oil

                                                         she is taking
a cold shower now and I am staring at the
entrails of ambitious dessert and I am
palpitating and I am sorry` },
          { title: 'Presently', sub: '2023', bodyType: 'poetry', body: `In a room, Oxforded colleagues congregated
There's suits you'll never wear; suits them
Gossamers of gabble adorn walls
Strike my face, like footslogged trees
And He even has the gall to cross his legs
As the pinstripes draw me in
Floating, in a sense. Can't see much from here
And don't try, the air is alien. Wouldn't even breathe,
Begets those ridges. Phone camera says so.

In a room, penumbrae in their places
Pounding away, pounding, pounding
Can't form the right synapses for nights like this
There's murmuring, maybe closer
The photonic dust storms form
cataracts on my astigmatized eyes.

In a room, outward--swaths of silhouettes
Moguls, shirtless, pantsless even
Intimately exchanging trade secrets, no doubt
Or they share a touch, two, three, become one
Others haven't the same luxury
She's seated at her vanity and well sees
The microscopic mounds speckled across her neb
I'm looking too. Maybe staring.
My patina outlined reflection and there's hairs
I didn't know I had. Tweeze to come back
She can't see the follicles burgeoning
On my shoulders, or she won't.

In a body, supine
Lay down to rise
Cross leg and vein pinches
Call me a hyposthesiac
At least my cat can hear me flail.` },
          { title: 'Orthographic', sub: '2023', bodyType: 'poetry', body: `Scribbled lines and swirls enough to call handwriting
On a piece of olive oil stained card stock from that restaurant
Up the road, thought it better than the phone calls we ordered

Fault the fountain pen for the dust storms
I could never see more than a few inches ahead of me
Enough to gage the tendon flex concreted grasp on the nib
And I could never picture how you'd tear through the envelope
Or if you'd leave it sitting upon your chestnut vanity
Between unsharpenable pencils and those matches you keep

I thought long about how much air it takes
To move an envelope across the country or
Across the sea, those muslin vessels and
The number of Dears within (how could we all be so?)

A letter catapulting through the breeze
Unable to land, la cursive on the blackboard,
Dropping a briefcase into the river returning from work
The only mail I get is postcards from far away suburbs

I've hollered it all into a few small lines
Estimated reading time,
                                                four minutes
Thought that whatever ink crept from my pen
Would leave my body like blood from a gash
Instead it was threads, pulled and pulled
From here to there; each one an axon afar within

I've erased novels for you
How could you expect a letter?
I've moved along with them
Stamps enough and address
Illegible` },
          { title: 'Allegory of a train gone by', sub: '2023', bodyType: 'poetry', body: `I'm staring at some electric wires
Tsunamis of cables and posts wash past
Lingering enough to galvanize, pull open the aorta
Passing by and leaving behind no sutures
And, for a moment, it's ichor that fills me

We're shoreside and I can't swim. The waves
Are calm, but there are waves. I'm not panting
Instead treading, ripples like your hands.
It's not like those New York Pools.

Always a perpetuum mobile
Jaw aches, too much chewing gum
Here in a short perpetuity
Measured in hours, city is your words
Sitting with the essence of that
Flag-red-Sticked-strawberry

Those conductors are impatient
Clocks too accurate for my Casio
I'm hoping to miss the return but
Stepping onto the platform

I'm waiting for the train to stop.
The trains may go. Tracks always end.
Trains can come back. Trains do.` },
          { title: 'Elegy for Jane', sub: '2022', bodyType: 'poetry', body: `At 7:33am, infiltrated the supersonics of my haze
voices instead of platitude text I followed with a Google, a Marin, Musgrove website set place in a dorm room seven sisters or fewer now

Heart pounds all my eternal sang out of my fingers
a bad habit if you ask me and she
loved Baudelaire and I hope the post-it
alstroemeria wall shredded peacefully

Those college towns are bleak in the winter
don't feel bad about working in ads
I'm in theatre why justify? I know ugly ducks
when I spot them. Drink your kirshwasser or
it will perfectly reach the temperature
of your body and slink silently down your gizzard` },
        ],
      },
      {
        title: 'Journals',
        sub: 'Selected entries',
        group: true,
        children: [
          { title: 'Debussy\'s 1st Arabesque, Lily Chou Chou and hyperfixation', sub: '10.17.2025', bodyType: 'prose', image: 'images/works/journal-debussy-lily-chou-chou.jpg', body: `<p>Suggested listening: Claude Debussy - Arabesque No. 1</p>

<p>I recently rewatched All About Lily Chou Chou at the Metrograph. I must admit that before my first watch, I didn\u2019t even realize that Lily Chou Chou was not a real artist, and listened to Glide because someone I had a crush on told me to check out Lily Chou Chou. I entirely forgot to even do that until a month or two after seeing this person, when I discovered a notes app entry that was dated May 24th, 2023 and only had three entries:</p>

<p>ShopliftersBrent EdwardsGlide by Lily Chou Chou</p>

<p>Per the titular determination of this journal entry, I have only engaged with and hyperfixated on Glide; I did not, and still unfortunately, have not watched Shoplifters nor have I read anything by Brent Edwards (and now, I don\u2019t even remember the specific book I was recommended, and am in a bit of an awkward spot to ask her which one it was she recommended, so I must either read everything Edwards has ever written or more simply, avoid him perpetually for fear that I may read the wrong book).</p>

<p>I added Glide to my yearn playlist and I listened to it an excruciating amount thereafter. I have a habit of hyperfixating on things for prolonged periods of time. Songs, movies, people, memories, food, the list goes on. I na\u00EFvely believe that it\u2019s impossible to actually have too much of a good thing.</p>

<p>It\u2019s not lyrical masterpiece, but I still think there\u2019s enough in the song that continuously resonated with me:</p>

<p>I wanna be \\ Oh, I wanna be \\ I wanna be just like the sea \\ Just swaying in the water \\ So to be at ease \\ To be away from all \\ To be one \\ Of everything</p>

<p>Luck would have it that Lily Chou Chou and I both want to be everything! But ultimately, I don\u2019t think lyrical depth was what kept me crawling back to the song (it\u2019s maybe a little too saccharine and heavyhanded). Instead, I think I find myself engaging in acts of aspirational thinking or nostalgia when I consume something to the dizzying degree that I do.</p>

<p>In a similar vein, the girl I had a crush on had posted a few songs on her SoundCloud, one which I embarrassingly listened to perhaps over a hundred times before I realized that on SoundCloud one could see the specifics of who was listening to their music and the frequency at which they were listening. It\u2019s sobering to quantify what a hyperfixation looks like (you must imagine my horror at the very moment I deduced this fact while I was waiting for a text back from her).</p>

<p>I find myself wondering where hyperfixation fits into my coping toolset\u2014I think it\u2019s a means of dealing with uncertainty. In these moments, I have the song I am listening to, and I have the agency to play it over again and feel a particular emotion and fantasize a certain way. It\u2019s repetitive, like meditation, and it isn\u2019t something I need to actively engage with. As long as I fixate on the object, I embrace the implicit emotions that accompany it sans thought. In this case, it was brief respite from the feeling that I was missing something; I felt connected to this fantasy for as long as I immersed myself in it.</p>

<p>After my recent rewatch of the film, I added a degree of separation to the fixation; I started learning Debussy\u2019s 1st Arabesque on piano, memorizing the first few pages pretty immediately and playing them whenever given the chance (chances include: at home on my Yamaha P40 and at school on a Casio whose keys do not contain any velocity and convinced me that I was a rotten piano player until I figured it out. It was a difficult deduction because the keys were weighted, yet played with equal velocity and dynamic. I have never figured out how to fix it).</p>

<p>The Arabesque feels to be a sort of second degree abstraction; I\u2019m hyperfixated on playing the piece (maybe not even on learning it entirely, but playing what I know) because my rewatch of Lily Chou Chou reminded me of my initial hyperfixation and the circumstances surrounding it. I\u2019m not certain that I\u2019ll ever be entirely compelled to complete the piece (though, I\u2019d really like to\u2014it surely wouldn\u2019t be a net negative in my life), but my constant repetition of the first and second page of the piece, playing them over as though there was a repeat at the end of the page and repeating ad nauseum, leads me to believe that completion isn\u2019t my intrinsic goal. Instead, I think I\u2019m wholly committed to the act of repetition as a manner of self-soothing.</p>

<p>I leave a lot of things unresolved, it\u2019s a habit I\u2019ve tried to kick, and I think it haunts me. As I write this, I note that I have a lot of projects that I have yet to finish, pieces I have yet to learn, and so on. Instead, I\u2019m cross-legged on a couch listening to the entire Lily Chou Chou album on repeat as I write something about my mental state from two years ago as it bleeds into the present. Reflection is productive, my therapist and I are in lock-step there, but I don\u2019t know when to stop reflecting. A number of things I start never end up complete because I get stuck in a spiral, or I lose momentum, or I short-circuit and find them impossible.</p>

<p>The children in All About Lily Chou Chou all have this ferocious hyperfixation on Lily Chou Chou. She\u2019s this ephemeral and highly influential musician that brings them solace as they grapple with the trials of being a kid/teenager. In the face of bullying, suicide, violence, and other pretty grim happenings, the Lily Chou Chou online forum and her discography offer these students a means of coping with, but not necessarily a means of processing, their traumas. And, because they can\u2019t resolve these traumas, they act out, propagating violence they\u2019ve experienced unto others. They\u2019re messy, as kids are, and though their means of externalizing trauma and grief may very well be seen as immature, barbaric, and horrific, they embody the violence associated with an inability to reconcile the remainder, the irreconcilable, the abstract.</p>

<p>Broadly speaking, things don\u2019t fit neatly into categories. Experiences, relationships, and memories are all messy and often rife with irresolution. I\u2019ve been reading a lot of Hegel and Adorno recently (I know, I know), and have managed to find some comfort in Adorno\u2019s approach to negative dialectics vis-\u00E0-vis Hegel\u2019s approach. Hegel seeks totality: objects need to fit snugly into concepts, whereas Adorno argues that Hegel\u2019s approach is reductive. Though imperfect categorization is violent and uncomfortable, Adorno argues we should recognize that there will always exist a remainder when we try to categorize things, instead of entirely buying that concepts and things are perfectly harmonious and sympatico.</p>

<p>The remainder is exactly what I struggle with, and I think the reason I hyperfixate. I struggle to place the remainder; placing it is how I find solace. Hyperfixating keeps me suspended, it prompts me to try to fit the remainder into something I know it can\u2019t fit into already. The tension of the remainder finds its way into the work I do and the art I make, but I don\u2019t know if there\u2019s a real way to rid oneself of it.</p>

<p>Irresolution, then, isn\u2019t as fatal as I think it should be, but to believe that, I think I need to believe that resolution and completion aren\u2019t obligated to each other. Ultimately, people live their entire lives with plenty that gets left unresolved, and by the time they\u2019ve died, their lives are technically complete, however they might feel about it. My grandmother was just moved to hospice after an excruciating battle with leukemia\u2014I can only imagine what thoughts and memories might be incessantly replaying in her mind, and whether she wishes she had found a means to resolve one thing or another into a Hegelian totality.</p>

<p>Immediately after writing this (i.e., the above), I stood up and walked across the shop floor to leave my campus and take the train home. Before leaving the building, I noticed that the terrible Casio keyboard, which for a period, had gone missing, was back in its place, in front of the entry doors. I sat down, took my earbuds out, and started plunking away at the first Arabesque. It had been a while since I had played the piece; I found that I managed to breeze through a section that I found previously impossible because I had consistently overthought it in the past.</p>

<p>Two classmates came up to me as I played. The first asked me if I was playing a Ravel, to which I laughed and explained that I hadn\u2019t nearly the aptitude to play any Ravel. He told me that his grandfather had been a piano player for his entire life, and that he had a particular affinity for impressionism, that the piece I was playing was immediately nostalgic and reminded him of his grandfather. The second classmate approached me and correctly guessed that I was playing the first Arabesque before mentioning that he had tried to learn it a while ago to no avail because of its difficulty, and found it enticing because of its polyrhythms. I told him that one enters a certain state when playing impressionist pieces from memory, one that makes the hard-to-memorize and atypical rhythms and harmonies hardly an active thought, but a feeling.</p>

<p>Clearly, and to my bewilderment, my partial-playing of the Arabesque triggered a memory, an irresolution in both of these classmates\u2014one as it relates to loss and grief, the other to the struggle to complete.</p>

<p>Debussy\u2019s Arabesque may be, for me, completely resolved, despite being incomplete. The two pages of the Arabesque that I have memorized can exist without the other three, and they do.</p>` },
          { title: 'A dream I had', sub: '04.14.2025', bodyType: 'prose', body: `<p>Suggested listening: Leaving Dreaming - Ellen Akbro</p>

<p>I was standing on a rooftop\u2014in front of me was the empire state building. There had been vertical and horizontal expansion on the empire state building, so weird blocky apartments that looked structurally unsound were being built right off of it.</p>

<p>I was there with my friend Max and a man who was explaining the rooftop that we were both on. There were walls that surrounded it, and the man who explained it to us said that the walls were perfectly designed so that when people looked down onto the rooftop from above all we could see were their eyes.</p>

<p>I turned around and pointed at a building, and remarked it was classic. It was gold-ish, with slightly greyed windows. Everyone in the building was sharply dressed as though they were Yuppie professionals from the 80s/90s.</p>

<p>Max and I then started to walk forward and found ourselves on a never-ending escalator. We wanted to go to the classic building to get something to eat, but found that the escalator we stepped on didn\u2019t truly connect to that building.</p>

<p>It was some strange escalator independent of the building. Incredibly wide. It clipped through floors, and Max and I didn\u2019t really know how or when to get off. We felt microscopic, that if we tried to get off, we\u2019d fall and get hurt.</p>` },
          { title: 'Past Lives, Before Sunrise, and life decisions', sub: '02.17.2025', bodyType: 'prose', image: 'images/works/journal-past-lives-before-sunrise.jpeg', body: `<p>Suggested listening: Quiet Eyes - Sharon Van Etten, Kokomo IN - Japanese Breakfast</p>

<p>In July of 2024, I began listening to the Past Lives soundtrack a lot. I think I clocked around 2,000+ minutes in less than four months from what I can gather (which is more than 50ish listen-throughs, which on paper doesn\u2019t look like a lot, but comparitively it feels like a lot). It wasn\u2019t an album that particularly struck me during the film, instead it was music I discovered after rewatching the film with a desire to keep the emotion going.</p>

<p>The film, in its most simple plot, is about a woman who feels entirely torn between the feelings she has for someone she\u2019s known since childhood, Hae Song, and her current husband, Arthur, with the caveat that her childhood-friend-turned-weird-talking-stage lives in South Korea, and she lives in New York and has a husband, and they can never be together because of that difference.</p>

<p>Yet, the solution isn\u2019t just both of them being in the same place. The woman, Nora, is not simply picking between two love interests\u2014instead, she picks between two lives. Hence, Past Lives.</p>

<p>It\u2019s a particularly poignant movie, and funnily, one I remember discussing a little more than a year ago with someone in a bar who gave me the faintest feeling that our relationship echoed Nora and Hae Sung\u2019s (or maybe it felt more like Celine and Jesse in Before Sunrise. I\u2019ll get to that). Maybe a little on the nose. Talking about the film as we sat there, as I wondered whether or not the mention of it was laden with subtext. I think the film feels particularly real for me because of that, and the choice of lives Nora has to make, or simply sees laid out in front of her, is something I feel I grapple with too frequently. I recall, at the bar, attempting to make guesses about the jazz band in front of us, what their lives were like and what they loved (the bassist, I guessed, loved McMansions). We tried to piece together the lives of the band by simplifying the pieces, talking about them as though it was obvious that this was their path, even if we did so jokingly.</p>

<p>There\u2019s obviously no knowing the truth\u2014Nora takes the moments she shares with Hae Sung and extrapolates them to the potential entire relationship. There\u2019s this rather terse exchange between Nora and Arthur when Hae Sung\u2019s in New York. Here\u2019s an abbreviated version:</p>

<p>ARTHUR: What if you met someone else at the residency?</p>

<p>NORA: That\u2019s not how life works.</p>

<p>ARTHUR: Yeah, but wouldn\u2019t you be laying here with him?</p>

<p>NORA: This is my life. And I\u2019m living it with you.</p>

<p>ARTHUR: Is this how you thought it would turn out?</p>

<p>NORA: This is where I ended up. This is where I\u2019m supposed to be.</p>

<p>It\u2019s crushing. Nora doesn\u2019t make any attempt to soften the sentiment with a white lie. I think the same exchange by a different couple might be filled with a little more forced na\u00EFvit\u00E9, pretending that they\u2019d have met regardless, or that this was exactly what they wanted to happen in life. Nora doesn\u2019t do that. \u201CThis is where I ended up. This is where I\u2019m supposed to be\u201D almost feels like a resignation, a kind of throwing her hands up in the air and a surrendering of agency. Arthur isn\u2019t satisfied with this answer, and it makes total sense why he wouldn\u2019t be. She doesn\u2019t really know if this is the \u201Cright\u201D or \u201Cwrong\u201D outcome, relationship, or life.</p>

<p>The feeling is so large and overwhelming. It is so ubiquitous\u2014the film doesn\u2019t explore it just for romance, but for someone who feels split between two lives, two selves. One lives in South Korea, the other in New York City. They have different careers, lovers, lives.</p>

<p>I feel it frequently. To reference the first journal entry on my site, all this reminds me of Sylvia Plath\u2019s fig tree. Life is too short to experience everything. We are left wondering whether or not we\u2019ve made the right choices, despite that thinking never being particularly productive. Nora saying \u201Cthis is where I\u2019m supposed to be\u201D is more comforting to her than it is to Arthur precisely because she\u2019s trying to stifle the \u201Cwhat ifs\u201D that invade her life.</p>

<p>I\u2019ve recently been struggling with this, with the what ifs. So often do I get thoughts about potential decisions stretched to some end, and I don\u2019t know if those thoughts are ever productive. Short, sweet moments that might\u2019ve been forever, or experiences with a life I don\u2019t have, but could have. Wondering if that life path is closed because of my circumstances or because of external circumstances concerning the path.</p>

<p>In Before Sunrise, a film I told the person at the bar I despised only because I found Ethan Hawke to be a little annoying, a different form of the alternative life is explored. Like Past Lives, we see the good moments, the experiences that are formative to the memory\u2014the sweet, wonderful moments that the characters will come to reflect on when they think about the experience. The film explores the thought of living with the experience despite not living the life. An experience exists just as the experience. Throughout the entire film, Celine and Jesse talk about how they\u2019ll move onto respective romantic interests in their home countries and how their brief relationship will have been a blip, something to nostalgically revisit. I understand this\u2014spending so much time with someone or something and being engaged for every moment is rare. In the film, they waver between believing that it\u2019ll remain a nice memory and believing that they\u2019ll always desire what they had in the future.</p>

<p>CELINE: You told me that our time together would someday make me happier with my future husband, but now I\u2019ll wonder even more.</p>

<p>It\u2019s hard to not think about days, weeks, months, that have passed and wonder, what if that was my entire life? What if I never stopped making adorational SoundCloud tracks because it worked out (or what if I only stopped because it did)? What if I had taken a totally different job out of college and risked more than I have out of passion? What if I had gone to a different grad school program? I drive myself to neurosis thinking about these things.</p>

<p>In Before Sunrise, the relationship is different from Past Lives\u2014there\u2019s an expiration date. Celine and Jesse know exactly how much time they have to see each other, so they talk about that fact. They\u2019ve had a nice few hours together, but when they\u2019ve crossed a certain threshold, they wonder about what comes next. We don\u2019t receive that luxury\u2014endings often catch us by surprise. In the moment, you might think, \u201Cwell, this is great! I can\u2019t wait to do it again!\u201D Until, you don\u2019t. And then you wonder if you could have been more diligent or enjoyed it even more, or had a conversation about it. I think about how I didn\u2019t cherish my time at Columbia enough until I graduated. I feel sick to my stomach at times when that thought crosses my mind because I\u2019ll never have that experience again. Even so, I was vaguely aware of the expiration date.</p>

<p>With other things, it\u2019s not so clear cut. College is linear in that you start it with the knowledge that the experience comes to an end at some point. The timeline of everything else isn\u2019t so obvious. You can never know when or if you\u2019ll see someone again. The anticipation of hoping to see them again may be great, but so is the crippling nostalgia of a time that\u2019s passed one by, not knowing if the last interaction is truly the last. I thought about this a lot when a cousin of mine passed in 2023. It was unexpected. My father, a rather emotionless man, couldn\u2019t even bring himself to tell me over the phone about what had happened. The more I thought about it, the more confused I got. I regretted not enjoying the last moment I spent with him, and that regret comes from the retroactive knowledge that our lunch at Souvlaki GR would be the last time I would see him. I couldn\u2019t have known in the moment.</p>

<p>On a different note, there\u2019s a scene from my life that I often revisit in my head that feels so much like Before Sunrise\u2014saying goodbye to somebody and narrowly catching a train, as opposed to missing it. I think about the potential that exists within that day a lot. The life that might\u2019ve been. Maybe that day needed to end as it did. Fate had its way. But, I didn\u2019t see that person much after that despite wanting to, and I still don\u2019t know which way I should be processing it all. Up until then, I hadn\u2019t spent a lot of time with them, and after, I could only think about how easy it all felt, like two puzzle pieces interlocking to complete the puzzle.</p>

<p>I became obsessed with waves for a while after that. I know exactly why. Waves are all different. They\u2019re transient, and they crash. You have to savor each wave because you\u2019re aware that it\u2019s the last time you\u2019ll see it before it crashes onto shore. Celine talks about the brevity of connection at some point:</p>

<p>CELINE: It\u2019s like if you knew your relationship had to end in two years, there would be no room for fighting or wasted time. There could be more love and appreciation for one another. It\u2019s like, if everyone you met you knew was going to die at midnight, you would be a much more compassionate person.</p>

<p>The person I talked to at the bar also mentioned the red thread of fate, and Past Lives touches on the notion of in-yun. Both refer to this almost divine providence that people end up with who they are meant to end up with\u2014in-yun spans over several lifetimes, that all connections in a past life come into the present life. Fate identifies important interactions and guides us to them. I wonder if I put too much pressure on trying to control these things or not. I\u2019m not certain if I\u2019m doing the right things right now, and I\u2019m really quite anxious about all of what\u2019s to come. It\u2019s relieving, perhaps, to latch onto the red thread/in-yun. The universe has it all planned out. I own my cat Fennel because the universe insisted that we needed each other. I think about the stuff that doesn\u2019t work out, though, and wonder what the universe is thinking there. Some people end up in bad relationships forever, some end up alone. Others never feel a sense of satisfaction with their careers, and some have horrible and tragic fates before the red thread gets to work its magic. What is the universe doing there?</p>

<p>I can\u2019t think about it too much without pushing myself to be a little teary-eyed. It doesn\u2019t make a whole lot of sense to me. And, despite all of that, it\u2019s impossible not to think of the past lives I could have lived or paths I could have taken, or paths that were closed because of bad timing. Ever since I was in middle school (back then, I was a devout Catholic boy), I remember pleading to God with the hope that he\u2019d benevolently tell me what the right decisions were. This was in some module about colleges and careers in the seventh grade. What job would I really enjoy and be really good at? What\u2019ll make me happy?</p>

<p>I keep thinking about this stuff. Waves are transient, I can\u2019t dwell. In-yun and the thread are great forces, like God. Maybe I need to remind myself that where I am is where I\u2019m supposed to be, but it\u2019s hard to accept if you\u2019re uncertain and find the sentiment hard to believe. I get why Nora cried in Arthur\u2019s arms at the end.</p>` },
          { title: 'Voyeurism and Gladiator 2', sub: '12.18.2024', bodyType: 'prose', image: 'images/works/journal-on-voyeurism-and-gladiator-2.png', body: `<p>About a month ago, I watched Gladiator 2. I have never seen the original Gladiator, nor did I attempt to pick up the lore prior to watching it. Really, I was incredibly excited to watch a new Ridley Scott film after the press tour of Napoleon. Scott, when badgered by French journalists for its wicked historical inaccuracy, retorted, \u201CWere you there? Oh you weren\u2019t there. Then how do you know?\u201D</p>

<p>A valid question. A question that set the stage for Gladiator 2, which did not escape identical claims of historical inaccuracy (indeed I also thought it peculiar that the film depicts the seemingly impossible feat of bringing saltwater sharks into the colosseum). Sharks aside, the film was fun enough and, as expected, the action sequences were compelling, the rest of the film not so. An utterly clich\u00E9 plot with some violence that makes my monkey brain go woo-woo, similar enough to pornography (structurally\u2014where plot is secondary to the \u201Caction.\u201D I want to clarify per my being raised in a puritanical society that I am NOT a consumer nor am I a purveyor of pornography), nestled under Martin Scorsese\u2019s movies-as-spectacle-or-theme-park claim. Gladiator 2 was a spectacle, but in an almost more disappointing context given Scott\u2019s rather illustrious career (Thelma & Louise, Alien, Blade Runner, etc. He\u2019s got range!).</p>

<p>I want to bring it back to Scorsese and the notion that films like Gladiator 2 are no better than theme parks. I find it fitting that most of the violence in the film happens in front of an audience of sorts (there are perhaps two or three that are not; the battle at the beginning, where it may be argued that the townsfolk are looking on, and the killing of the emperors). The subject matter makes that hard to avoid\u2014the majority of the violence happens between gladiators, whether in the arena or not.</p>

<p>The colosseum is packed to the brim with spectators who root for some gladiator or another\u2014it\u2019s comparable to a football game (I think that American football is modernized trench warfare) or any other sporting event. Sports are a form of spectacle, these battles are too. People bet on outcomes and viewers are impassioned by all that happens below them. The pain, injury, and death is ultimately just entertainment for the Roman audience. The stakes are higher for Lucius, the titular Gladiator 2, but your run of the mill plebian doesn\u2019t know that. We, as the audience, are aware of the gravity of these fights.</p>

<p>There\u2019s a level of dramatic irony in our participation as viewers watching these violent scenes unfold\u2014we are wholly aware of most character motivations, and generally everything important that\u2019s going on at the top. We\u2019re privy to everything going on in Lucius\u2019s head as he fights. It\u2019s easier to sympathize with him when we know what he\u2019s fighting for (and because Ridley Scott kills his wife in the opening sequence of the film. It\u2019s hard not to feel bad for a widow). Irony is one word, voyeurism is another; as viewers we watch every private moment, moments that would typically have no spectator. Now, I think it\u2019s easy to look at the medium and think, \u201CWell, it\u2019s all voyeuristic! Every film is about watching people\u2019s most intimate affairs\u2014the basis of narrative art is taking the consumer on a sympathetic journey with the hero!\u201D</p>

<p>That\u2019s true. Though, something about voyeurism in Gladiator 2 strikes me as different. I think it has to do with how we exist at times as spectators in the colosseum, and at times as invasive observers when they\u2019re not fighting. It feels like the plot exists solely to chain the violence together. Maybe I think that because the screenplay sucks, but I also think that it isn\u2019t entirely false. I\u2019m reminded of the Mike Tyson v. Jake Paul boxing match\u2014horrible, but topical. Most everybody in the United States and beyond had a favorite, identifying and sympathizing with one of the fighters. I rooted for Mike Tyson, and I grew increasingly frustrated, agitated, and eventually depressed as he gave such an abysmal effort in the fight.</p>

<p>Gladiator 2 can\u2019t just present unconnected pieces of violence to a crowd, and the nature of its existence as a film prohibits it from doing such. It\u2019s unbecoming of the medium\u2014even if the plot is bad, blockbusters must have a plot. So, it\u2019s the voyeurism that builds the plot, and the voyeurism that gives the movie-going audience stakes. We are manipulated into identifying with the hero Lucius from the beginning of the film and manipulated to some degree between each fight scene with saccharin plot development. We sympathize with Acacius and Lucilla because they\u2019re on Lucius\u2019s side, and despise Macrinus because he directly opposes Lucius.</p>

<p>Voyeurism in Gladiator 2 aims to destroy what might otherwise be too meta\u2014the conscious act that we\u2019re watching something watched by others. But how does this differ from your typical action flick?</p>

<p>There\u2019s another aspect that lies within the gladiator/actor relationship. That\u2019s yet another meta component of the film\u2014a typical action sequence in a film devoid of spectators has the involved actors embodying the characters and fighting one another, with the only spectator being the camera. In Gladiator 2, the actors embody fighters that must attempt to garner sympathy and favor from the spectators in the film, but they must also achieve this with spectators watching the film. This double performance leads one to wonder\u2014is the violence the same when there are spectators within in the film and when there aren\u2019t? In the case of a gladiator, I\u2019m certain that the life-or-death circumstances prevent total awareness of the crowd from infiltrating their minds. However, in the case of Gladiator 2, one must wonder if Lucius would indeed have presented or acted differently in any of his important fights. Even the final fight, not in the arena, had an audience composed of thousands of Roman soldiers. Is Lucius motivated by the crowd?</p>

<p>In the film\u2019s opening sequence, he ends up underwater and ultimately captured by Acacius\u2019s army\u2014this is how he becomes a gladiator. This battle was violence in it of itself\u2014spectator-free, no holds barred. Lucius loses, yet throughout the film, when he has an audience, he wins. Does Lucius hide all weakness when aware that he is being perceived? Voyeuristic insight into the actors/gladiators leaves us questioning real and fake.</p>

<p>It\u2019s difficult to not bring back the pornography comparison. I dare assume that most pornographic content on the internet is staged for the express pleasure of spectators, a la Gladiator 2\u2019s fights in the arena. Yet by nature of subject matter, the voyeuristic act is pushed to the extreme. We see individuals at their most vulnerable: naked, horny, and hedonistic. But it is ultimately all for show. Some videos contain an element of plot, as though attempting to garner some sympathy or predisposed feeling towards the people about to engage in sexual acts. Despite all the pomp and circumstance of introducing a narrative, pornography does not seriously pretend to be content of substance, and it does not pretend to be true intimacy. Actors are consciously performing\u2014sounds, angles, and so on\u2014are choreographed. The narrative need not be convincing, but the sex does.</p>

<p>Yet, it is the pretense that sex is a private act that influences how this media is consumed. There\u2019s not a lot of fourth wall breaking in pornography\u2014there\u2019s an active attempt to hide all aspects of production to keep the illusion that the spectator is a voyeur. If it seems fake, just like violence, spectators cannot react the same way. The difference between Gladiator 2 and pornography is that Gladiator 2 isn\u2019t a snuff film, whereas porn stars actually have sex.</p>

<p>There\u2019s a blurry boundary between performance and authenticity across the board. Nothing we consume will ever be the real thing, like sports are, so we force some form of narrative or sympathy to give us stakes. Pornography is different because arousal can happen sans narrative when viewers have the \u201Creal deal\u201D in front of them. Gladiator 2 needs these voyeuristic moments that differentiate private Lucius and public Lucius because the viewers don\u2019t have real violence in front of them, and they don\u2019t have anyone to root for without it. Sex doesn\u2019t necessarily require a winner, so the tension you see in sport/war as spectacle isn\u2019t needed in pornography.</p>

<p>As Scott asks\u2014were we there, and if not, how do we know? How do we know who the authentic and real Lucius is, if he so exists at all? What are the real boundaries between what we will entertain as spectacle and not, and what are the prerequisite elements that a spectacle needs? I wrote a few months back about our private/public selves. I think Scott makes me wonder which, if either, is the authentic self.</p>` },
          { title: 'Gretchen Bender\'s Dumping Core', sub: '10.16.2024', bodyType: 'prose', image: 'images/works/journal-gretchen-bender-dumping-core.png', body: `<p>Gretchen Bender wrote,</p>

<p>\u201CI believe that an acceleration into, rather than a resistance to, our multilayered visual environment will reveal structures or open windows to the development of a critical consciousness we can\u2019t yet perceive as useful from within our immediate vantage point.\u201D</p>

<p>Dumping Core is an installation artwork created by Gretchen Bender in 1984. It comprises 13 televisions, all which start in sync playing snippets of TV commercials, animated graphics, war footage, and so on, that progressively get out of sync. Accompanying the footage is a loud synth soundtrack that is discordant from the TV programming. In front of the televisions is a bench for viewers to sit on, in a manner suggesting a stage play. I saw the piece several times at the MoMA, my first time in 2017, a year after its installation. It was a piece I revisited often.</p>

<p>I consider her piece to be a foreshadowing of the state of affairs that followed in terms of media consumption\u2014it\u2019s interactive in a similar way that scrolling through Twitter or TikTok is interactive. Viewers are directed to \u201Cinteract\u201D with the piece in a specific manner, sitting in front of the TVs on a bench, with no real instruction regarding the contents of the piece or how to follow along. Dumping Core is a piece that, despite my interacting with it more than 30 years after its inception, felt like one of the most compelling works of art in the post-modern era\u2014it preempted the manner in which the Gen Z mind consumes media. The extreme leaps Bender takes with this work\u2014her rapid-fire editing, the disconnected audio/visual experience, and the literal inability to focus on all TVs as one unit\u2014all feel so innate within our modern media landscape.</p>

<p>It seems that all of my interactions with technology have been inching towards this overstimulating mode of consumption. Bender\u2019s work also unsettles with its disjointed nature, highlighting key cultural commentary about media consumption, TV news, consumerism and commercialism, and other salient postmodern themes quite present in the 80s. As I write this, my roommate is browsing through TikTok in the room near mine while I listen to Paul Simon\u2019s Darling Lorraine on Apple Music. There\u2019s media overload all around me. Dumping Core is the essence of our current relationship with media and how we interact with it. So, while the piece itself is not explicitly interactive in a manner where a user provides input, it almost predicts our relationship with interactive media today.</p>

<p>Consider the media landscape of the time\u2014the 80s were a time of rapid development in consumer technology. CNN started in 1980 as the first 24-hour news network on cable. These channels slowly began to amass a larger audience share, capitalizing on sensational news reporting as exemplified by the O.J. Simpson trial coverage on CNN. Reactionist works like Videodrome by David Cronenberg highlight the average American\u2019s endless desire to consume, using violence and depraved acts to demonstrate this in the film. The era can also be aptly called the peak of postmodernism, with theorists like Baudrillard and Bourdieu commenting on the nature of reality/hyperreality and culture shaped by materialism. Baudrillard in particular makes an astute argument about the media landscape in his work Simulacra and Simulation, wherein he notes our descent into hyperreality is directly linked to media like television demolishing any semiotic reference to the real world.</p>

<p>This period can also be viewed through Marshall McLuhan\u2019s lens in The Gutenberg Galaxy. McLuhan explores the very ways in which media influence social consciousness\u2014just as the invention of the Gutenberg press revolutionized the very fabric of society, television and media in the 80s began to erode any sense of reality as seen in prior generations. If 80s media is hyperreal, we enter Baudrillard\u2019s simulation. Culture in this age is developed through reference to media. The more we consume, the more our reality warps.</p>

<p>As I reflect back upon Bender\u2019s work, it\u2019s impossible to ignore her overt commentary on this postmodern sentiment. The world that Bender creates with this installation is intended to mimic the era. The viewer sits in a dark room and has the choice of any given TV to direct their attention to. If the viewer tires of one program, they can simply turn their head and look towards another program displaying far more colorful and interesting graphics. It is true that the viewer has the aforementioned choice to divert their gaze wherever in the exhibit, but the viewer is limited to seeing only the television screens. The darkness that enshrouds the exhibit alienates the viewer from the outside world, while the music is set at a volume that is just a little too loud to further isolate the viewer. Bender makes it impossible for a viewer to engage with the real world in this exhibit, instead she boldly demands their attention for 18 minutes. As an \u201Cinteractive\u201D piece, Dumping Core transports the viewer to another reality and encourages them to break from the context of the museum, where they may consider each piece thoughtfully and independently. She assails the viewer with enough to render the contemplative viewing pattern useless, and preys upon the viewer\u2019s modern and innate urge to passively consume a myriad stimuli at once.</p>

<p>However, what Bender may not have predicted or envisioned at the time is the prevalence of smartphones in the present day. Ironically, one can sit at the bench and completely ignore Bender\u2019s work simply by pulling out an iPhone. Her attempt to capture attention has been bested by modern media practice that extends beyond the 24 hours news cycle. The smartphone introduces the 24 hour everything cycle, be that shopping, socializing, gaming, and so on. The only disruption to Bender\u2019s attempt at constructing an alternate media reality is another screen that contains another alternate media reality. The cycle continues, and brutally so.</p>

<p>A viewer can consume media on the internet with the same rapid-fire impulse as seen in Dumping Core. One moment, a viewer might pause to laugh at a meme, after, they may pause to look at a gorey photo of some recent happening. I noted earlier that Bender\u2019s piece was isolating from reality\u2014it is very dark and very loud. Social media today feels similar. The dopamine rush encourages a user to come back to the platform and seclude themselves from reality. The content is overstimulating and oversaturated\u2014every other TikTok now links to an item in the TikTok Shop. The same trends in the 80s\u2014hyper consumerist tendencies, the attention economy, and so on\u2014are found on the internet today and are more extreme than ever. What feels even more present in today\u2019s information age is that human interaction with these devices has only increased, and has made it even more difficult to break from the device into reality. The user, through real and tangible movements, manipulates the virtual, and bridges the gap between the two.</p>

<p>Yet, no room can be perfectly dark. The MoMA cannot control for light leak and ensure that the exit remains visible and accessible. Therefore, when seated in the exhibit, and likely unintentional to Bender, one might spot the yellow haze of a light from the outside exhibits creeping into the installation room. There exists a small beacon of optimism, almost as if Dumping Core is attempting to gently remind the viewer that there is, in fact, an exit, and that one can leave whenever they so please and re\u00EBnter the real world. It\u2019s a tacit acknowledgement that despite living in the age of information, one doesn\u2019t need to have an ideological alignment of being pro/anti technology. Instead, one can recognize the ability to exist in this in-between of reality and hyperreality, acknowledging both and engaging with both.</p>

<p>This leads to perhaps the most fundamental difference between Dumping Core and our contemporary technological lives. The installation inherently recognizes that there is ultimately a return to the real world\u2014the programming is finite, ending after a set duration and repeating, and it exists in the context of other works that don\u2019t necessarily evoke the same experience in a viewer. There is always an ultimate end to Bender\u2019s work. When we consider smartphones and today\u2019s internet landscape, our relationship with media seems to blur. There isn\u2019t a real escape from the technological hyperreality. Our phones exist as extensions of ourselves\u2014Donna Haraway astutely describes in her work A Cyborg Manifesto that living beings and technology ultimately merge to form a human nature and culture that relies on technology, and is inseparable from it. Cell phones are extensions of the self\u2014human social interaction and other innate natural instincts are now literally impossible to execute in today\u2019s social context without a phone. There\u2019s a sort of social ostracization that might occur if you were to walk up to someone and befriend them, then promptly whip out a flip phone to store their contact information instead of an iPhone. Such behavior is social deviance.</p>

<p>To be honest, Bender\u2019s piece feels like a warning sign from the 80s, despite her claim that an \u201Cacceleration\u201D can \u201Creveal structures or open windows to the development of a critical consciousness we can\u2019t yet perceive.\u201D Maybe it is the case that we can\u2019t quite perceive the consciousness since we\u2019re currently living in it. Yet, her piece now appears to embody that period and gives viewers a retroactive sense of what that critical consciousness may have been like in the 80s. Today, however, Dumping Core is exaggerated, brash, and at times impossibly incoherent. The television as a symbol of media overstimulation is classic, but dated. They\u2019re not as mobile as cell phones, far less interactive than computers, and relatively uninteractive. What is particularly distressing, however, is that despite the knowledge of the horrid and negative impacts of technology proliferating across the postmodern era, we have continued to develop these technologies. They are even more invasive and integrated than ever before. It is as if, collectively, we decided that we would stay on Bender\u2019s bench and watch the programming in hopes of reaching some critical consciousness, and chose to ignore the light beam that promised a world of relative tangibility and natural instinct free of false realities.</p>` },
          { title: 'Theme parks as masochism', sub: '09.21.2024' },
          { title: 'Dinner and a movie', sub: '07.16.2024', bodyType: 'prose', image: 'images/works/journal-dinner-and-a-movie.jpg', body: `<p>I recently went to see the film The Cook, the Thief, His Wife, & Her Lover, directed by Peter Greenaway, masterfully scored by Michael Nyman, and gorgeously costumed by Jean Paul Gaultier. Before going to watch the movie at the IFC Center, I took myself out to dinner.</p>

<p>There\u2019s this restaurant on Sullivan right before you get onto Houston called Three of Cups. It\u2019s a bizarre restaurant, a mix of American and French cuisine, to a degree, but to me, it reads more as a restaurant where the chef had a few good ideas and no way to piece them all together under a cohesive culinary culture. This is totally fine. In fact, I think there might be a world of dining experience to be explored, a world where nothing really makes sense in context and where the menu logic baffles critics and diners alike.</p>

<p>As a vegetarian, I had limited options. Crossed off the list were rotisserie chickens and cuts of lamb\u2014the two viable options left were: 1. Japanese roasted root vegetables, and 2. Tofu and paneer tikka masala. As you might be able to deduce, neither of these particularly French nor American. I opted for the tikka masala\u2014old reliable\u2014a dish I eat perhaps three times a week, particularly after I developed a mild tofu ick. To accompany my dinner, a glass of ripasso and a couple essays by Elisa Gabbert, all to bide the time before my feature screening.</p>

<p>The film\u2019s concept is simple enough\u2014a rather despicable man, Albert Spica, portrayed by Michael Gambon, terrorizes the staff, clientele, et al. in his restaurant. Described in the script as \u201Ca 40 year old master crook, a dangerous, infantile monster, sexually prurient, a snob,\u201D he\u2019s the film\u2019s eponymous thief, and consistently gripes with the food his head chef serves him. His wife, Georgina, played by Helen Mirren, develops a romantic affair with another patron of the restaurant, Michael. Most major plot events take place in one of three locations, all connected\u2014the restaurant\u2019s dining hall, the kitchen, or the loading dock for the kitchen.</p>

<p>This was my first true solo dining experience\u2014I\u2019ve done it while traveling, but it has always felt less consequential. To solo dine in your home town is to succumb to the essence of solo dining, because there is always the option to do otherwise. I quickly thought about the optics\u2014what would the public think? Paul, eating alone at a restaurant? How mysterious. How pathetic.</p>

<p>Michael, in the film, mostly dines alone, bringing a stack of books and scattering them about his table. Spica, on the other hand, gregariously dines with an entourage of lackeys. After spotting the solo diner, Spica asserts that they\u2019re in a restaurant, not a library, that Michael should pack his books up and either eat, or read, but not both, and certainly not in his restaurant.</p>

<p>I think the real reason I, or anyone else, hesitate to dine alone is because we\u2019ve oriented ourselves to associate restaurants with socialization. Tables are set for two or more, appetizers are often made to be shareable, and so on. There\u2019s also a degree of vanity I associate with the decision, perhaps because of its novelty. Theoretically, one could do anything as a solo diner\u2014mindlessly scroll through TikTok, watch an entire movie on their phone, stare off into the distance with a melancholic gaze\u2014endless activities for the lone diner. It feels particularly asocial, however, to obsess over one\u2019s phone in this context. Somehow, because phone use is lowbrow and reading highbrow, those who bring books to restaurants moreso escape the ridicule of a solo diner.</p>

<p>The solo diner is one that is judged purely on their actions, then. There\u2019s a certain sense of validity to this, at least, as I observe socially. Ordering takeout and using delivery apps like DoorDash are solutions to the negative optics of solo dining, the outer experience. I can escape the public eye, eating a dinner that I could have ordered at a restaurant from the comfort of my own home, free to do as I please, without risking social suicide.</p>

<p>Therefore, I think it\u2019s true that dining is a sort of performative experience, or at least an external one, whether public or private. We are surrounded by other people, complete strangers, all with the capacity to listen to our conversations and watch our every action. A solo diner implicitly acknowledges their entry into the public realm, they acknowledge that they, by leaving their house, can judge and be judged. It\u2019s the Grecian philosophy of private vs. public life. Despite meaning to experience dinner alone, solo diners are not alone, instead they interact with the public world to a substantial degree.</p>

<p>Georgina spots Michael across the dining hall\u2014he is engrossed in his book before making eye contact with her. Reading is almost a deliberate signal to the world\u2014as if he is advertising his character, his private life, to the public. Or, to a degree, he is forming a facade of sorts, signaling what he wishes the public would theorize about his private life. Michael\u2019s character description in the script reads, \u201CA modest, fearless, ironic bookseller.\u201D Bookseller, yes. Modest? Perhaps not.</p>

<p>The very fact that Michael\u2019s character is a bookseller is integral to his reading books alone at a restaurant. I may venture to guess that Greenaway would have changed Michael\u2019s actions should he have been any other profession, yet as a deliberate iconographic signifier, his reading books plural in a restaurant serves to inform the audience that Michael is bookish, intelligent, perhaps even fearless. He knowingly opts to dine against social convention, and by making this choice, he acknowledges the public setting of the restaurant and chooses to engage with it, particularly after catching Georgina\u2019s eye. He\u2019s a perfect foil to Spica, loud, obnoxious, and terribly dislikable. Yet, both share a regard for their concern with public life and perception. Spica verbalizes his worries and discontentment, Michael implies them, yet brashly.</p>

<p>When Spica tosses Michael\u2019s books aside after he chides him for reading, Michael returns the next day, still with books to read. If no decision was made up to this point, this is the ultimate active decision, the decision that entirely affirms Michael\u2019s recognition of the public eye. Very easily could he have gone to another restaurant or listened to Spica, who rules as the voice of authority in this particular one. When Michael is ultimately killed at the end of the film, he is stuffed with pages of his favorite book until he suffocates at his bookstore. Here, Michael is held to the image he\u2019s portrayed throughout the film, but ultimately, it is not the same as his private self. When forced to adopt his public identity internally, he dies. He\u2019s no longer invincible, his public self has invaded his private home. The synthesis of these two realms literally kills Michael.</p>

<p>On a more obvious note, Michael is killed because his affair with Georgina is made public, again, a real messy consequence of private and public merging. In this case, it\u2019s the inverse\u2014the private is made public, and in this context is rejected by those who see it. Michael undergoes a radical transformation where public attempts to become private and private attempts to become public\u2014no person can handle such a dramatic shift of entirely different worlds.</p>

<p>When it comes to dining, it\u2019s almost impossible to envision solo diners as anything but their public facing selves. The tension between public and private makes it impossible for a solo diner to bring their private lives to dinner. Using TikTok while enjoying a succulent meal is essentially screaming to the world, \u201CI am addicted to my phone! I love TikTok!\u201D while being aware of that messaging.</p>` },
          { title: 'COVID Singularity', sub: '07.11.2024', bodyType: 'prose', body: `<p>Today, I\u2019m finally able to re\u00EBnter society after contracting COVID for the second time. This strain in particular is endearingly called \u201CFLiRT,\u201D an apt name for a disease spread through face-to-face contact, the exchanging of droplets, etc. etc.</p>

<p>Both times I\u2019ve contracted COVID, I was the sole person in my party to get infected. The scenarios are eerily similar\u2014I, and a few friends (average: 5.5 people), hit the proverbial town, spending approximately two hours at a single bar after pregaming well beyond necessity. Once there, we neatly assume a circle formation, all facing inward, until one of us is brave enough to make a new friend, or decides that the hour to grab another drink has struck (this is often my reason).</p>

<p>Somehow\u2014in both of these contexts, COVID loomed large and decided I would be its only victim. As a responsible bearer-of-illness, I isolated as quickly as I found out, managing to infect nobody else. My getting ill and subsequent getting better were both incredibly isolated experiences, perhaps the antithesis of FLiRT\u2019s essence.</p>

<p>I don\u2019t know how to read this\u2014is it better or worse that I was the only one? Isolation, for one, certainly feels more isolated without a COVID compatriot.</p>

<p>This time around, I had a profoundly worse experience with the illness than my first time. It crept in slowly, not bearing its teeth in full until the third day of my symptoms. This was a cascade of lightheadedness, chest pain, and generally, \u201COh Fuck This Is It. It\u2019s Over.\u201D I quickly typed some variant of \u201Cchest pain covid emergency?\u201D into Google and the answer was some variant of \u201CYes.\u201D</p>

<p>Very quickly I thought about calling for an ambulance. Up to this point I had never called 911\u2014the sole thought of dialing those numbers into my phone felt like a crime. What was an emergency? Initially, I thought to myself, \u201CWell, we shouldn\u2019t be so dramatic. Somebody probably needs this ambulance.\u201D Then I lied down for a minute. After feeling my chest nearly combust, I decided that I probably needed the ambulance.</p>

<p>The phone rang. I was greeted with an incomprehensible jumble of sounds from the other end that grew increasingly aggressive. This was likely because I kept saying, \u201CWhat? I can\u2019t hear you.\u201D I was given the option of requesting an ambulance, a firetruck, or a police vehicle. After considering my options for a moment, I decided that an ambulance made the most sense here, despite my really wanting to call the FDNY too. This desire came from deep within, from the reptilian instinct that supersedes my regular brain.</p>

<p>I returned to my bed, where I counted down the minutes. My apartment buzzer was broken and I thought to myself, should I call 911 again, just to clarify and let them know? After entertaining that decision tree, there was a commotion outside of my apartment, with a strong door knock or two promptly following. This WAS the FDNY. I was overjoyed, then confused. Apparently they were just the EMT\u2019s lackeys, checking to see if I could make it down the stairs. There must have been approximately four or five people in total escorting me down the stairwell in my bleach-stained shorts and my Covid-infested Uniqlo Airism tee. I hobbled down the steps, my legs hardly supporting my weight because of the adrenaline rush, not a single person in my posse attempting to help me down.</p>

<p>After entering the ambulance, I was greeted by two very native New Yorker EMTs, mostly identifiable because of their vaguely Italian-American sense of laissez-faire and their vaguely Italian-American accents. The first EMT, less vocal and more nose to the grindstone, proceeded to struggle as he placed the EKG stickers onto my bare chest.</p>

<p>The other, more rugged, EMT told me that I was fine, that people like me, twenty-three year olds, are probably the best equipped to handle COVID. I tried to listen to the words that came out of his mouth while simultaneously thinking that I may be experiencing my final moments on earth. Also on my mind was the fact that my shirt was becoming so damp it resembled a rorschach diagram. My EKG results were clear\u2014I was not having a heart attack.</p>

<p>I\u2019m not sure what it is about my COVID magnetism that isolates me from the rest of my group. I find that as an adult who has graduated college, this isolation is increasingly more common. I didn\u2019t feel trapped in my confinement. It felt much more standard, like this was a regular week, except for the fact that I was working from home. I\u2019m writing this as I attempt to make evening plans\u2014it\u2019s already 7:20pm and the prospect is dwindling. This may be due to a lack of proactivity in setting plans, but frequent are the weeknights where one trudges through as if they have COVID.</p>

<p>The entire experience frightened me to my core. Even in a moment of panicked illness and sickness, I found myself alone. After the whole ordeal, I returned to my work as if nothing of interest had just traversed. I don\u2019t feel that there aren\u2019t people in my life\u2014on the contrary. There are plenty, many of whom I adore deeply. But it is this momentary isolation that can, at time, feel amplified. Alone, there are substantially fewer things to distract one from their condition. Boredom, in my eyes, only occurs when one is alone, and lacks sufficient distraction.</p>

<p>I think stuff like this is what convinces me more and more that man is inherently social, why we desire romance so strongly, and so on. There\u2019s a particular frigidity that loneliness carries.</p>` },
          { title: 'Hungover Sartre', sub: '07.05.2024', bodyType: 'prose', body: `<p>I had put off reading Sartre\u2019s Existentialism is a Humanism for quite some time. Perhaps I owe that to the following Google Books review posted by a Timothy Proffitt, which reads, in its entirety:</p>

<p>\u201CSartre stays in the realm of obscurity, his credence of \u2018Existence before Essence\u2019 is just the flip of Camus\u2019 metaphysical works. He is blind to the truth of Being.\u201D</p>

<p>Sartre\u2019s book may very well be an inversion of Camus\u2019 principles\u2014my edition of the text contains a seething criticism of Camus\u2019 novel The Stranger. So, Camus and Sartre may have been at odds. I\u2019m nowhere near the capacity to weigh in on any nuances in this debate, nor do I think I can pick a side. After a night of debauchery and the consequential hangover I am grappling with, I say they both may be correct, who am I to make this or that judgement? In moments of tumult, where my intellectual shortcomings make themselves ever so present to a point where I simultaneously believe two ideas, totally at odds, I recall a passage from F. Scott Fitzgerald\u2019s essay The Crack-Up. He writes:</p>

<p>\u201CThe test of a first-rate intelligence is the ability to hold two opposing ideas in mind at the same time and still retain the ability to function.\u201D</p>

<p>Now, I\u2019ve managed to catapult myself from this groveling sense of inaptitude to a feeling that I myself possess a first-rate intelligence given I retain the ability to function. By virtue of comparison, Sartre and Camus are both dead, and therefore are unable to function and therefore must not be intelligent (at least not to the degree that I, a living man in his early twenties, must be). Fitzgerald too for that matter. This is Perhaps not the most sound logic, but I shall take what I can get. As for Timothy Proffitt, be he alive or dead, I shall remark that he so resolutely takes Camus\u2019 side by claiming Sartre is blind to the truth of Being.</p>

<p>This is all to say that I think Sartre\u2019s claim that existence precedes essence is true to an extent. I\u2019ve always had this lingering thought that I only am what I am because I\u2019ve willed it. I reflected on this the other day\u2014my mother complimented my Arabic script, informing me that my English handwriting by comparison was atrocious and unreadable, while the sharpest of grammar school teachers might laud me on my Arabic.</p>

<p>I found this funny. Handwriting is never really an innate or natural thing. One has to will it, because one is presented with the letters as reference prior to learning how to write them. I look at the letter K and I note its shape. Then, I emulate its shape, striving to get as close as possible until I finally achieve K. Given I learned the English alphabet as a mere child, and given that I only started practicing writing Arabic last week, I think my mother makes an unfair comparison.</p>

<p>I think these circumstances would be wildly different if we all held off on learning how to write until adulthood. Then, we\u2019d all have improved capacity to emulate compared to our youthful selves, not to mention an across the board improvement in motor skills. I don\u2019t know this for a fact, but if I had to operate on a patient in dire need of a kidney transplant, and for some reason, my three-year-old self was performing the same exact procedure but in the room directly next to mine, my (adult-self) patient would be more likely to survive. You can\u2019t trust a three-year-old with a scalpel.</p>

<p>Handwriting is fluid, too. My handwriting in high school looked much worse (in my opinion) than it does now. This is due to a process of imitation\u2014I have encountered handwriting-a-plenty and sought to emulate aspects of script that I find interesting or aesthetically desirable. This was not a concern in kindergarten, I simply wanted to spell \u201Capple\u201D correctly.*</p>

<p>This process of imitation, and Sartre\u2019s claim in Existentialism is a Humanism, has made me wonder whether all that we accomplish in life is an act of imitation, and originality is just a synthesis of imitation mixed with randomness (in the example of handwriting, poor motor skills). When I attempt to concoct a five-year plan, it often can only be done when I think about the things that I will imitate, the things that have already been done by someone else somewhere else. The uncertainty is uncertain because we have never seen it before, and therefore cannot necessarily will it to be. This makes me believe that we all simultaneously live very original lives and very derivative lives.</p>

<p>My business partner recently pressed me to boldly claim what it was that I wanted\u2014what I wanted to do, what I wanted out of life. I think this is an unfair question, mostly because I don\u2019t think I\u2019ve found the specific thing I want to be doing yet. There\u2019s nothing for me to imitate in the long term. I think I see a lot of things on the horizon, paths I can take within the week, month, or year, but I have never been able to truly envision myself in 10 years. Yesterday I felt as though I had an epiphany of sorts, a moment of clarity I wasn\u2019t expecting to experience on the 4th of July. Because I could only really think in these short term spans, I should be acting within them, because that\u2019s where I think one finds this easy to swallow act of imitation. For instance, it can be crippling for me to say, think about moving to Los Angeles next month if I envisioned that it would be my entire life. However, thinking about it as just a period of time\u2014a few months, a year\u2014it\u2019s much easier to swallow this way.</p>

<p>This is all to say that I think innate within us, and perhaps to Sartre\u2019s point, is this power of self-determination and/or the self fulfilling prophecy. The thought that everything we do is derivative to an extent can be really frightening. It evokes a feeling of predeterminism, that we don\u2019t really have any control over what we do, how we act, and so forth. Though, this sentiment can be thought of hopefully\u2014existence preceding essence implies that we do exist prior to imitating.</p>

<p>Where does this take me? I think it lowers the stakes a little bit. I think I can just will myself to be whatever I think I wish to be in the short term because essence is fluid. Handwriting changes, who I am and what I do changes. Fluidity means no decision is forever, and that makes deciding easier to do.</p>

<p>*This brings to mind an instance where, as a child, I demanded that my preschool teacher tell me how to spell the letter B. She told me that it was just spelled B. I happened to be a highly dubious and skeptical kid, so I rebuked my teacher after her bold assertion. In my head, she didn\u2019t understand the essence of my question. She told me once again that it was just B. I figured this interaction would be a losing game and instead decided to ask my mother after school. She, in fact, corroborated my teacher\u2019s claim, and so I went on believing that nobody would ever understand the question I was asking and so desperately trying to get to the bottom of, rather than admit defeat and believe that B was, quite simply, spelled B.</p>` },
          { title: 'A quick thought concerning a yoga class', sub: '06.30.2024', bodyType: 'prose', body: `<p>The instructor instructed my class to pretend we were giving the earth a hug. I imagined myself in a forest with dense shrubbery. It reminded me of what I think the land in the Hobbit looks like, though I\u2019ve never read the book or watched the film. There I was, laying atop the moist and squishy soil, giving it the warmest embrace I could as beads rolled out of every sweat-producing orifice I had. I then thought about cavemen participating in this exercise, and how they might, after a few minutes, stand back up and continue to sharpen their sticks because they\u2019re always touching dirt to some degree. They\u2019re not lying on a centimeter-thin yoga mat in a 95 degree room staring at a ceiling ridden with green lights that make one feel as though they were a reptile writhing under the heat lamp of some enclosure. There\u2019s no corporate for cavemen to escape. Would yoga like this prove effective in their state of nature, loins covered by a single leaf? At any rate, it certainly wasn\u2019t proving effective in the present, non-wild surroundings of the West Village. Indeed, I may have felt more connected with the world had I laid down on Canal Street and hugged the pavement while cars skirted left and right and pigeons timidly attempted to cross the road. At least I wouldn\u2019t need to envision that environment\u2014I\u2019d really be feeling something, not some cheap emulation.</p>` },
          { title: 'So many roads', sub: '06.29.2024', bodyType: 'prose', body: `<p>I often think to myself how lucky I am to live in a neighborhood where I can take so many different roads to get home. When I lived in Michigan, in a car-centric town, variety on the way home wasn\u2019t ever an option\u2014I may be able to attribute that to a constant reliance on Google Maps to get where I was going. When you\u2019re on foot, things are different. The sprawl that extends outside of Thompson and Spring is slowly becoming more familiar, I myself becoming more of a local.</p>

<p>I find myself mentally raving about these options often. These roads offer me a break in what might be an otherwise mundane act of returning home. If I find myself in the West Village, I can choose between contemplative and quaint old Bedford or a cortisol-peaking walk down 7th Ave where the fear of getting run over by some Hyundai SUV occupies the mind at length.</p>

<p>In The Bell Jar, Sylvia Plath metaphors her life to a fig tree:</p>

<p>I saw my life branching out before me like the green fig tree in the story. From the tip of every branch, like a fat purple fig, a wonderful future beckoned and winked. One fig was a husband and a happy home and children, and another fig was a famous poet and another fig was a brilliant professor, and another fig was Ee Gee, the amazing editor, and another fig was Europe and Africa and South America, and another fig was Constantin and Socrates and Attila and a pack of other lovers with queer names and offbeat professions, and another fig was an Olympic lady crew champion, and beyond and above these figs were many more figs I couldn\u2019t quite make out. I saw myself sitting in the crotch of this fig tree, starving to death, just because I couldn\u2019t make up my mind which of the figs I would choose. I wanted each and every one of them, but choosing one meant losing all the rest, and, as I sat there, unable to decide, the figs began to wrinkle and go black, and, one by one, they plopped to the ground at my feet.</p>

<p>The Bell Jar was a book I read at the best/worst time possible\u2014the summer into my senior year of college, spent in Washington, D.C. This was a period of profound loneliness, for I knew nobody in the city, and felt that nobody there could truly know me. In the months prior, I grappled with the residue of sexual trauma and the horror of finding out a close friend of mine had taken her own life. Reading Plath\u2019s novel felt like consulting a sage who had looked in a crystal ball, prophesying about my mental and emotional state for the next year. I found myself in total and constant agreement with her perspective and attitude towards the utterly banal world around her. At the time, towards the tail end of the most mundane corporate summer internship I\u2019d truly ever had the displeasure of doing, I had started studying to take the LSAT in an effort to give my life some purpose and to appease the passed on aspiration of my immigrant father.</p>

<p>On a typical day, I\u2019d leave my gentrified apartment complex in search of a coffee shop, and then explore a little bit of a neighborhood I\u2019d never seen before. Regardless of the area, my path followed a similar structure\u2014an espresso, a pastry, then, a walk to a bookstore, where I\u2019d buy a book I was certain I would never read yet convinced myself that the inverse would be true. I\u2019d then return home, plunk through some Khan Academy course, take a practice LSAT, and have dinner. In the evenings, I picked up a book and attempted to read through as many pages as possible before passing out in my chair.</p>

<p>This was my routine. My paths changed, the outcome always the same. Sometimes my practice scores improved, other times they shocked me beyond comprehension. Sometimes I bought a bundle of yellow flowers to commemorate my late friend, other times I didn\u2019t. These are small choices\u2014buying some alstroemerias will never correlate to my ability to become an Olympic swimmer or a renowned biophysicist (for one, alstroemerias will never teach me how to swim nor the essence of molecular biology). I do believe that one\u2019s life is just a series of small decisions that somehow connect into the retrospective path that becomes The Big Picture. A decision to impulsively go on a date with some girl I once knew could simply be one date, where she returns to being a girl I once knew, or it could be the next year of my life. I don\u2019t know if one ever consciously makes the decision to become something.</p>

<p>Despite that, I look around and notice people who have chosen their figs. These are people who, perhaps in early adolescence, kicked their legs out from under their sheets in the morning, prepared a drip coffee, and boldly exclaimed, \u201CFrom here on out, I will be this!\u201D That\u2019s obviously farcical, but I can\u2019t help but, in moments of anxiety and unassuredness, think to myself that this is just how the rest of the world does it. I writhed in my bed today, finally rising at the sordid hour of 11am, the sun cooking me like a lamb roast, begging me to start my soon-to-be-afternoon and accomplish something meaningful. All the while, I found myself in an anxiously comparative state, wondering why I hadn\u2019t woken up a famous actor, director, writer, gallery artist, designer, or a combination of them all.</p>

<p>My parents will send me a box of Turkish figs from time to time\u2014they\u2019re delightful. Dried and not excruciatingly sweet, tender and soft. The figs are ornately arranged within a plywood box covered in plastic wrap, so you can bear witness the quality of the fig before you dig in. A bit of twine wraps around the stem of each fig, making for a long conga line neatly settled in rows. I can never have a single fig. I\u2019ll have them as breakfast, leaving my door having practically dry swallowed six figs in quick succession. Like Sylvia Plath, I contemplate the fig I\u2019ll eat, the person I\u2019ll become. But instead of a paralysis leading to inaction, I eat a lot of figs, hoping to have it all, to be all of the above without missing a thing. However, these are dried figs, impossible to compare to the stately ceremony of eating the fresh fruit, which are ripe for fractions of a moment, fickle and delicate.</p>

<p>When I walk home, I tell myself that I\u2019m keeping myself agile, mentally fit, unafraid of change, when I choose a new and unexplored route. The obvious logical problem here is that I always end up in the same place. My apartment is in the same place each time. I look around at all the different paths I have or could have taken, and yet I always end up here. It feels futile to pick a path home. I do so for aesthetic reasons, so I can enjoy the walk a little more, or for practical purposes if I\u2019m running late. Ultimately, the choices I make wind up immaterial. There is no long term difference, all roads lead to home.</p>

<p>I recently read an essay about randomness by Elisa Gabbert. She writes that \u201Cit\u2019s too hard to live when you believe you can see how the rest of your life will play out.\u201D Gabbert states this as a reflection of her middle age, hitting her forties and realizing that the blankness of youth is ultimately lost to a predictable end. This is why she values randomness, and good change, because it keeps her future blank and unpredictable. It echoes the energy of her youth.</p>

<p>I\u2019m not certain that blankness is ultimately the most desirable aspect of youth. Maybe it is in hindsight. I\u2019m also not convinced that knowing exactly what fig to eat is the right way to live, either. I hold these two contradictory sentiments in my head perpetually. The first, to know what lies ahead in my future, what it is I want to do or become, so that I might fixate on becoming it. The second, that not knowing exactly what I want is a far more pleasurable manner to live, as it means that I cannot predict what might happen, and that my lived experience will truly be different from a previously lived life. Is my desire to be a famous director the result of watching really good movies that already exist? Yes, it\u2019s very likely.</p>

<p>The thought of taking a path with an obvious next step frightens me because life seems rote if predictable, and it means alienating all other options, watching all other figs rot. Yet, I\u2019m not sure if I feel entirely capable of becoming something when I don\u2019t know what the next step ought to be, and I wholeheartedly wish that I was decisive enough to choose. It\u2019s a cyclical fear.</p>

<p>I continue to trod down the roads that bring me the most joy, ultimately. Bedford has plants plenty and a serenity to it that 7th lacks. I still know where I\u2019m going, but at times, I get lost along the way, stopping into a plant store or succumbing to the olfactory temptation of an Aesop. The paths home are infinitely variable despite the location staying the same, and sometimes I know exactly what path I\u2019m taking. Other times, I\u2019m not so sure.</p>` },
        ],
      },
    ]
  },
  about: {
    title: 'About',
    custom: true,
    portrait: 'images/works/paul-portrait.png',
    bio: 'Paul Hanna is a first-generation Iraqi-Assyrian-American filmmaker, writer, director, and multimedia artist based in New York City. His work spans narrative films and television, experimental video, music videos, web art, installation art, and interactive art. His films and installations have been featured in festivals, galleries, and public exhibitions.',
    education: [
      { school: 'Columbia University', degree: 'B.A. in Film and Philosophy' },
      { school: 'NYU Tisch School of the Arts', degree: 'M.P.S. in New Media Art' },
    ],
    links: [
      { label: 'Director Reel', href: 'https://vimeo.com/1135207939' },
      { label: 'IMDb', href: 'https://imdb.me/paulhanna' },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/paulhanna361/' },
      { label: 'Instagram', href: 'https://www.instagram.com/p.aulhanna/' },
      { label: 'Substack', href: 'https://substack.com/@paulsplace' },
    ],
    contact: 'paul@paul.place',
    resume: 'PaulHanna_Resume.pdf',
  }
};

// ─── SLUG GENERATION & ROUTING ───
function toSlug(str) {
  return str
    .toLowerCase()
    .replace(/[''\u2019]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

// Build a lookup: slug → { sectionKey, itemIdx, groupIdx?, childIdx? }
const slugMap = {};
Object.keys(sections).forEach(key => {
  if (!sections[key].items) return;
  sections[key].items.forEach((item, idx) => {
    const slug = item.slug || toSlug(item.title);
    item._slug = slug;
    if (!item.group) {
      slugMap[slug] = { sectionKey: key, itemIdx: idx };
    }
    if (item.children) {
      item.children.forEach((child, ci) => {
        const childSlug = child.slug || toSlug(child.title);
        child._slug = childSlug;
        slugMap[childSlug] = { sectionKey: key, groupIdx: idx, childIdx: ci };
      });
    }
  });
});

// ─── PANEL LOGIC ───
const panel = document.getElementById('panel');
const overlay = document.getElementById('panel-overlay');
const panelContent = document.getElementById('panel-content');
const panelClose = document.getElementById('panel-close');
let currentSection = null;

function openPanel(key) {
  currentSection = key;
  const s = sections[key];
  if (s.custom && key === 'about') {
    renderAbout();
  } else {
    renderSectionList(key);
  }
  panel.classList.add('open');
  overlay.classList.add('open');
  panel.scrollTop = 0;
  document.querySelectorAll('.nav-label').forEach(n => n.classList.remove('active'));
  document.querySelector(`[data-section="${key}"]`).classList.add('active');

  track('section_open', { section: key });
  trackPageView(key, s.title + ' — Paul Hanna');
  startViewTimer('section/' + key);
}

function getThumb(item) {
  if (item.image) return item.image;
  if (item.images && item.images.length) return item.images[0];
  return null;
}

function isLinkOnly(item) {
  return item.link && !item.embed && !item.description && !item.body && !item.images;
}

function renderSectionList(key) {
  const s = sections[key];
  panelContent.innerHTML = `
    <h2>${s.title}</h2>
    <p>${s.description}</p>
    <div class="panel-items">
      ${s.items.map((item, idx) => {
        const thumb = getThumb(item);
        const bgStyle = thumb ? ` style="background-image:url('${thumb}')"` : '';
        const groupClass = item.group ? ' is-group' : '';
        const extClass = item.link ? ' is-external' : '';
        const extBadge = item.link ? '<span class="item-ext">\u2197\uFE0E</span>' : '';
        return `
        <div class="panel-item${thumb ? ' has-thumb' : ''}${groupClass}${extClass}" data-section="${key}" data-idx="${idx}"${bgStyle}>
          <div class="item-text">
            <div class="item-title">${item.title}${item.group ? ' <span class="item-count">' + item.children.length + '</span>' : ''}${extBadge}</div>
            <div class="item-sub">${item.sub}</div>
          </div>
        </div>`;
      }).join('')}
    </div>
  `;
  panelContent.querySelectorAll('.panel-item').forEach(el => {
    el.addEventListener('click', () => {
      const section = el.dataset.section;
      const idx = parseInt(el.dataset.idx);
      const item = sections[section].items[idx];
      if (item.group) {
        renderGroup(section, idx);
      } else if (isLinkOnly(item)) {
        window.open(item.link, '_blank', 'noopener');
        track('external_link', { section, item: item.title, url: item.link });
      } else {
        openDetail(section, idx);
      }
    });
  });
}

function renderGroup(sectionKey, groupIdx) {
  const s = sections[sectionKey];
  const group = s.items[groupIdx];
  panelContent.innerHTML = `
    <button class="detail-back" id="group-back">\u2190\uFE0E ${s.title}</button>
    <h2>${group.title}</h2>
    ${group.sub ? `<p>${group.sub}</p>` : ''}
    <div class="group-list">
      ${group.children.map((child, idx) => `
        <div class="group-item" data-group="${groupIdx}" data-child="${idx}">
          <span class="group-item-title">${child.title}</span>
          <span class="group-item-sub">${child.sub}</span>
        </div>
      `).join('')}
    </div>
  `;
  panel.scrollTop = 0;

  document.getElementById('group-back').addEventListener('click', () => {
    renderSectionList(sectionKey);
    panel.scrollTop = 0;
  });

  panelContent.querySelectorAll('.group-item').forEach(el => {
    el.addEventListener('click', () => {
      const gi = parseInt(el.dataset.group);
      const ci = parseInt(el.dataset.child);
      openChildDetail(sectionKey, gi, ci);
    });
  });
}

function openChildDetail(sectionKey, groupIdx, childIdx, skipPush) {
  const s = sections[sectionKey];
  const group = s.items[groupIdx];
  const item = group.children[childIdx];

  if (!skipPush) {
    const slug = item._slug || toSlug(item.title);
    history.pushState({ slug: slug }, '', '/' + slug);
  }

  if (!panel.classList.contains('open')) {
    currentSection = sectionKey;
    panel.classList.add('open');
    overlay.classList.add('open');
    document.querySelectorAll('.nav-label').forEach(n => n.classList.remove('active'));
    document.querySelector(`[data-section="${sectionKey}"]`).classList.add('active');
  }

  let html = `<button class="detail-back" id="detail-back">\u2190\uFE0E ${group.title}</button>`;
  html += `<h2>${item.title}</h2>`;

  if (item.sub) {
    html += `<div class="detail-meta"><span class="detail-tag">${item.sub}</span></div>`;
  }

  if (item.image) {
    html += `<img class="detail-hero" src="${item.image}" alt="${item.title}" loading="lazy">`;
  }

  if (item.body) {
    const typeClass = item.bodyType === 'poetry' ? 'body-poetry' : 'body-prose';
    html += `<div class="detail-body-full ${typeClass}">${item.body}</div>`;
  }

  if (item.link) {
    html += `<a class="detail-link" href="${item.link}" target="_blank" rel="noopener">${item.linkLabel || 'View'} \u2192\uFE0E</a>`;
  }

  panelContent.innerHTML = html;
  panel.scrollTop = 0;

  track('detail_open', { section: sectionKey, item: item.title });
  trackPageView(item._slug, item.title + ' — Paul Hanna');
  startViewTimer('detail/' + sectionKey + '/' + item.title);

  document.getElementById('detail-back').addEventListener('click', () => {
    history.pushState({ section: sectionKey }, '', '/');
    trackPageView(sectionKey, sections[sectionKey].title + ' — Paul Hanna');
    renderGroup(sectionKey, groupIdx);
  });
}

function renderAbout() {
  const s = sections.about;
  panelContent.innerHTML = `
    <h2>${s.title}</h2>
    <div class="about-header">
      ${s.portrait ? `<img class="about-portrait" src="${s.portrait}" alt="Paul Hanna">` : ''}
      <div class="about-bio">${s.bio}</div>
    </div>
    <div class="about-section">
      <div class="about-label">Education</div>
      ${s.education.map(e => `
        <div class="about-edu">
          <div class="about-edu-school">${e.school}</div>
          <div class="about-edu-degree">${e.degree}</div>
        </div>
      `).join('')}
    </div>
    <div class="about-section">
      <div class="about-label">Links</div>
      <div class="about-links">
        ${s.links.map(l => `<a href="${l.href}" target="_blank" rel="noopener">${l.label}</a>`).join('')}
      </div>
    </div>
    <div class="about-section">
      <div class="about-label">Contact</div>
      <a class="about-contact" href="mailto:${s.contact}">${s.contact}</a>
    </div>
    ${s.resume ? `<div class="about-section"><a class="detail-link" href="${s.resume}" target="_blank" rel="noopener">Resume \u2192\uFE0E</a></div>` : ''}
  `;
}

function openDetail(sectionKey, itemIdx, skipPush) {
  const s = sections[sectionKey];
  const item = s.items[itemIdx];

  // Update URL
  if (!skipPush) {
    history.pushState({ slug: item._slug }, '', '/' + item._slug);
  }

  // Ensure panel is open
  if (!panel.classList.contains('open')) {
    currentSection = sectionKey;
    panel.classList.add('open');
    overlay.classList.add('open');
    document.querySelectorAll('.nav-label').forEach(n => n.classList.remove('active'));
    document.querySelector(`[data-section="${sectionKey}"]`).classList.add('active');
  }

  let html = `<button class="detail-back" id="detail-back">\u2190\uFE0E ${s.title}</button>`;
  html += `<h2>${item.title}</h2>`;

  // self-hosted video — takes top priority
  if (item.video) {
    html += `<video class="detail-hero" src="${item.video}" controls playsinline preload="metadata" style="width:100%;border-radius:4px;margin-bottom:1.5rem;background:#000;"></video>`;
  }
  // embed (video) — takes priority over hero image
  else if (item.embed) {
    html += `<div class="detail-embed"><iframe src="${item.embed}" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen loading="lazy"></iframe></div>`;
  }
  // hero image (only if no embed, and no gallery)
  else if (item.image && (!item.images || !item.images.length)) {
    html += `<img class="detail-hero" src="${item.image}" alt="${item.title}" loading="lazy">`;
  }

  // image gallery
  if (item.images && item.images.length) {
    const colStyle = item.galleryCols ? ` style="grid-template-columns:repeat(${item.galleryCols},1fr)"` : '';
    html += `<div class="detail-gallery"${colStyle}>`;
    item.images.forEach((src, i) => {
      // first image spans full width if gallery has odd count (skip when custom cols)
      const wide = (!item.galleryCols && i === 0 && item.images.length % 2 === 1) ? ' class="wide"' : '';
      html += `<img${wide} src="${src}" alt="${item.title} — ${i + 1}" loading="lazy">`;
    });
    html += `</div>`;
  }

  // tags
  if (item.tags && item.tags.length) {
    html += `<div class="detail-meta">${item.tags.map(t => `<span class="detail-tag">${t}</span>`).join('')}</div>`;
  }

  // description
  if (item.description) {
    html += `<div class="detail-body">${item.description}</div>`;
  }

  // long-form body (essays, poetry)
  if (item.body) {
    const typeClass = item.bodyType === 'poetry' ? 'body-poetry' : 'body-prose';
    html += `<div class="detail-body-full ${typeClass}">${item.body}</div>`;
  }

  // link
  if (item.link) {
    html += `<a class="detail-link-btn" href="${item.link}" target="_blank" rel="noopener">${item.linkLabel || 'View project'} \u2197\uFE0E</a>`;
  }

  panelContent.innerHTML = html;
  panel.scrollTop = 0;

  track('detail_open', { section: sectionKey, item: item.title });
  trackPageView(item._slug, item.title + ' — Paul Hanna');
  startViewTimer('detail/' + sectionKey + '/' + item.title);

  // back button
  document.getElementById('detail-back').addEventListener('click', () => {
    history.pushState({ section: sectionKey }, '', '/');
    renderSectionList(sectionKey);
    panel.scrollTop = 0;
    trackPageView(sectionKey, sections[sectionKey].title + ' — Paul Hanna');
    startViewTimer('section/' + sectionKey);
  });
}

function closePanel(skipPush) {
  panel.classList.remove('open');
  overlay.classList.remove('open');
  document.querySelectorAll('.nav-label').forEach(n => n.classList.remove('active'));

  if (!skipPush) {
    history.pushState(null, '', '/');
  }

  track('panel_close', { section: currentSection });
  trackPageView('', 'Paul Hanna — Director, Writer, Producer, Multimedia Artist | paul.place');
  startViewTimer('home');
  currentSection = null;
}

document.querySelectorAll('.nav-label').forEach(el => {
  el.addEventListener('click', () => openPanel(el.dataset.section));
});
panelClose.addEventListener('click', () => closePanel());
overlay.addEventListener('click', () => closePanel());

// ─── URL ROUTING ───
function routeFromPath() {
  const path = window.location.pathname.replace(/^\//, '').replace(/\/$/, '');
  if (path && slugMap[path]) {
    const entry = slugMap[path];
    if (entry.childIdx !== undefined) {
      openChildDetail(entry.sectionKey, entry.groupIdx, entry.childIdx, true);
    } else {
      openDetail(entry.sectionKey, entry.itemIdx, true);
    }
    return true;
  }
  // Section-level routing (e.g. /film, /about)
  if (path && sections[path]) {
    openPanel(path);
    return true;
  }
  return false;
}

// Handle browser back/forward
window.addEventListener('popstate', () => {
  const path = window.location.pathname.replace(/^\//, '').replace(/\/$/, '');
  if (path && slugMap[path]) {
    const entry = slugMap[path];
    if (entry.childIdx !== undefined) {
      openChildDetail(entry.sectionKey, entry.groupIdx, entry.childIdx, true);
    } else {
      openDetail(entry.sectionKey, entry.itemIdx, true);
    }
  } else if (path && sections[path]) {
    openPanel(path);
  } else {
    closePanel(true);
  }
});

// Open deep link on initial load
routeFromPath();

// ─── MOBILE DETECTION ───
const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) || window.innerWidth < 768;

// ─── THREE.JS SCENE ───
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 200);
camera.position.set(0, 0.5, 6);

const renderer = new THREE.WebGLRenderer({ antialias: !isMobile });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor(0x000000);
renderer.outputEncoding = THREE.sRGBEncoding;
document.body.appendChild(renderer.domElement);

// ─── VIDEO TEXTURE ───
const video = document.getElementById('reel-video');
video.play().catch(() => {
  // iOS/mobile requires user gesture to start video
  const startVideo = () => video.play();
  document.addEventListener('click', startVideo, { once: true });
  document.addEventListener('touchstart', startVideo, { once: true });
});
const videoTexture = new THREE.VideoTexture(video);
videoTexture.minFilter = THREE.LinearFilter;
videoTexture.magFilter = THREE.LinearFilter;

// ─── STARS ───
const starCount = isMobile ? 300 : 800;
const starGeo = new THREE.BufferGeometry();
const starPos = new Float32Array(starCount * 3);
const starSizes = new Float32Array(starCount);
for (let i = 0; i < starCount; i++) {
  starPos[i * 3] = (Math.random() - 0.5) * 100;
  starPos[i * 3 + 1] = (Math.random() - 0.5) * 100;
  starPos[i * 3 + 2] = (Math.random() - 0.5) * 100;
  starSizes[i] = Math.random() * 1.5 + 0.3;
}
starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
starGeo.setAttribute('size', new THREE.BufferAttribute(starSizes, 1));
const starMat = new THREE.PointsMaterial({
  color: 0xffffff,
  size: 0.15,
  transparent: true,
  opacity: 0.6,
  sizeAttenuation: true,
});
scene.add(new THREE.Points(starGeo, starMat));

// ─── VIDEO BACKGROUND PLANE (with VHS shader) ───
const bgVert = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;
const bgFrag = `
  uniform sampler2D uVideo;
  uniform float uTime;
  uniform float uVideoAspect;
  uniform float uScreenAspect;
  varying vec2 vUv;

  void main() {
    // Cover-crop: keep video aspect ratio, crop excess
    vec2 uv = vUv;
    if (uScreenAspect > uVideoAspect) {
      // screen wider than video — crop top/bottom
      float scale = uVideoAspect / uScreenAspect;
      uv.y = uv.y * scale + (1.0 - scale) * 0.5;
    } else {
      // screen taller than video — crop left/right
      float scale = uScreenAspect / uVideoAspect;
      uv.x = uv.x * scale + (1.0 - scale) * 0.5;
    }

    // very subtle barrel distortion
    vec2 centered = uv - 0.5;
    float dist = length(centered);
    uv = uv + centered * dist * 0.06;

    // minimal chromatic aberration
    float offset = 0.002 + sin(uTime * 2.0) * 0.0005;
    float r = texture2D(uVideo, uv + vec2(offset, 0.0)).r;
    float g = texture2D(uVideo, uv).g;
    float b = texture2D(uVideo, uv - vec2(offset, 0.0)).b;
    vec3 col = vec3(r, g, b);

    // scanlines
    col -= sin((uv.y + uTime * 0.05) * 400.0) * 0.04;

    // glitch lines
    col += step(0.994, sin(uTime * 30.0 + uv.y * 50.0)) * 0.15;

    // green tint
    col.g *= 1.08;
    col.r *= 0.94;

    // darken to sit behind the frog
    col *= 0.55;

    // vignette
    float vig = clamp(1.0 - dist * 1.4, 0.0, 1.0);
    col *= vig;

    // VHS flicker
    col *= 1.0 + sin(uTime * 12.0) * 0.015 + sin(uTime * 60.0) * 0.005;

    gl_FragColor = vec4(col, 1.0);
  }
`;

const bgMaterial = new THREE.ShaderMaterial({
  vertexShader: bgVert,
  fragmentShader: bgFrag,
  uniforms: {
    uVideo: { value: videoTexture },
    uTime: { value: 0 },
    uVideoAspect: { value: 16 / 9 },
    uScreenAspect: { value: window.innerWidth / window.innerHeight },
  },
  depthWrite: false,
});

// Size the plane to fill the camera view at z = -10
// Camera: FOV=40, at z=6 → distance to plane = 16
const bgDist = 16;
const bgHalfH = Math.tan(THREE.MathUtils.degToRad(20)) * bgDist;
const bgAspect = window.innerWidth / window.innerHeight;
const bgPlane = new THREE.Mesh(
  new THREE.PlaneGeometry(bgHalfH * 2 * bgAspect, bgHalfH * 2),
  bgMaterial
);
bgPlane.position.z = -10;
bgPlane.renderOrder = -1;
scene.add(bgPlane);

// ─── LOAD THE FROG (GLB) ───
const frogGroup = new THREE.Group();
frogGroup.position.y = -0.3;
scene.add(frogGroup);

let frogModel = null;
let frogBaseScale = 1;

const loader = new THREE.GLTFLoader();
loader.load('frog.glb', (gltf) => {
  frogModel = gltf.scene;

  // Auto-scale: fit the model to ~2.8 units
  const box = new THREE.Box3().setFromObject(frogModel);
  const size = box.getSize(new THREE.Vector3());
  const maxDim = Math.max(size.x, size.y, size.z);
  const scale = 2.8 / maxDim;
  frogModel.scale.setScalar(scale);

  // Center the model
  const center = box.getCenter(new THREE.Vector3());
  frogModel.position.set(-center.x * scale, -center.y * scale, -center.z * scale);

  // Ensure normals exist, keep model's own PBR materials
  frogModel.traverse((child) => {
    if (child.isMesh) {
      if (!child.geometry.attributes.normal) {
        child.geometry.computeVertexNormals();
      }
    }
  });

  frogBaseScale = scale;
  frogGroup.add(frogModel);
}, undefined, (error) => {
  console.error('Error loading frog.glb:', error);
});

// ─── LIGHTING (PBR) ───
const ambient = new THREE.AmbientLight(0x333333, 1.0);
scene.add(ambient);
const keyLight = new THREE.DirectionalLight(0xffeedd, 1.2);
keyLight.position.set(2, 3, 4);
scene.add(keyLight);
const fillLight = new THREE.DirectionalLight(0x44ff88, 0.4);
fillLight.position.set(-3, -1, 2);
scene.add(fillLight);
const rimLight = new THREE.DirectionalLight(0x6688ff, 0.5);
rimLight.position.set(0, 2, -4);
scene.add(rimLight);
const hemi = new THREE.HemisphereLight(0x445544, 0x111111, 0.6);
scene.add(hemi);

// ─── FLOATING DUST PARTICLES ───
const dustCount = isMobile ? 25 : 60;
const dustGeo = new THREE.BufferGeometry();
const dustPos = new Float32Array(dustCount * 3);
const dustDrifts = [];
for (let i = 0; i < dustCount; i++) {
  dustPos[i * 3] = (Math.random() - 0.5) * 12;
  dustPos[i * 3 + 1] = (Math.random() - 0.5) * 8;
  dustPos[i * 3 + 2] = (Math.random() - 0.5) * 8;
  dustDrifts.push({
    speed: 0.002 + Math.random() * 0.005,
    phase: Math.random() * Math.PI * 2,
  });
}
dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));
const dustMat = new THREE.PointsMaterial({
  color: 0x66ffaa,
  size: 0.04,
  transparent: true,
  opacity: 0.35,
  sizeAttenuation: true,
});
const dust = new THREE.Points(dustGeo, dustMat);
scene.add(dust);

// ─── POST-PROCESSING: CRT OVERLAY ───
const renderTarget = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight);

const crtVert = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;
const crtFrag = `
  uniform sampler2D tDiffuse;
  uniform float uTime;
  uniform vec2 uResolution;
  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;
    // subtle barrel distortion
    vec2 c = uv - 0.5;
    float d = dot(c, c);
    uv = uv + c * d * 0.06;

    // chromatic aberration
    float aberr = 0.0015 + sin(uTime * 1.5) * 0.0005;
    float r = texture2D(tDiffuse, uv + vec2(aberr, 0.0)).r;
    float g = texture2D(tDiffuse, uv).g;
    float b = texture2D(tDiffuse, uv - vec2(aberr, 0.0)).b;
    vec3 col = vec3(r, g, b);

    // scanlines
    float scanline = sin(uv.y * uResolution.y * 1.0) * 0.03;
    col -= scanline;

    // subtle static noise
    float noise = fract(sin(dot(uv * uTime, vec2(12.9898, 78.233))) * 43758.5453);
    col += (noise - 0.5) * 0.025;

    // vignette
    float vig = 1.0 - d * 1.5;
    col *= clamp(vig, 0.0, 1.0) * 0.9 + 0.1;

    // slight green shift
    col.g *= 1.04;

    // flicker
    col *= 1.0 + sin(uTime * 8.0) * 0.008;

    // horizontal interference lines (rare)
    float interference = step(0.998, sin(uTime * 5.0 + uv.y * 100.0)) * 0.08;
    col += vec3(interference * 0.5, interference, interference * 0.5);

    gl_FragColor = vec4(col, 1.0);
  }
`;

const crtQuadGeo = new THREE.PlaneGeometry(2, 2);
const crtMaterial = new THREE.ShaderMaterial({
  vertexShader: crtVert,
  fragmentShader: crtFrag,
  uniforms: {
    tDiffuse: { value: renderTarget.texture },
    uTime: { value: 0 },
    uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
  },
  depthTest: false,
  depthWrite: false,
});
const crtScene = new THREE.Scene();
const crtCamera = new THREE.Camera();
const crtQuad = new THREE.Mesh(crtQuadGeo, crtMaterial);
crtScene.add(crtQuad);

// ─── INTERACTION ───
let mouseNDC = { x: 0, y: 0 };
let targetRotX = 0, targetRotY = 0;
let currentRotX = 0, currentRotY = 0;

document.addEventListener('mousemove', (e) => {
  mouseNDC.x = (e.clientX / window.innerWidth) * 2 - 1;
  mouseNDC.y = -(e.clientY / window.innerHeight) * 2 + 1;
  targetRotY = mouseNDC.x * 0.4;
  targetRotX = -mouseNDC.y * 0.25;
});

document.addEventListener('touchmove', (e) => {
  // prevent pull-to-refresh / overscroll (except inside panel)
  if (!panel.classList.contains('open')) e.preventDefault();
  const t = e.touches[0];
  mouseNDC.x = (t.clientX / window.innerWidth) * 2 - 1;
  mouseNDC.y = -(t.clientY / window.innerHeight) * 2 + 1;
  targetRotY = mouseNDC.x * 0.4;
  targetRotX = -mouseNDC.y * 0.25;
}, { passive: false });

// ─── ANIMATE ───
const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);
  const t = clock.getElapsedTime();

  // update video background shader
  bgMaterial.uniforms.uTime.value = t;

  // smooth rotation follow mouse
  currentRotY += (targetRotY - currentRotY) * 0.04;
  currentRotX += (targetRotX - currentRotX) * 0.04;

  // idle float
  frogGroup.position.y = -0.3 + Math.sin(t * 0.5) * 0.15;
  frogGroup.rotation.y = currentRotY + Math.sin(t * 0.2) * 0.05;
  frogGroup.rotation.x = currentRotX + Math.cos(t * 0.25) * 0.03;
  frogGroup.rotation.z = Math.sin(t * 0.3) * 0.02;

  // subtle breathing on the whole model
  if (frogModel) {
    const breathe = 1 + Math.sin(t * 0.8) * 0.015;
    frogModel.scale.set(
      frogBaseScale * breathe,
      frogBaseScale / breathe,
      frogBaseScale * breathe
    );
  }

  // dust drift
  const dPos = dust.geometry.attributes.position;
  for (let i = 0; i < dustCount; i++) {
    dPos.array[i * 3 + 1] += Math.sin(t * dustDrifts[i].speed * 10 + dustDrifts[i].phase) * 0.002;
    dPos.array[i * 3] += dustDrifts[i].speed * 0.3;
    if (dPos.array[i * 3] > 6) dPos.array[i * 3] = -6;
  }
  dPos.needsUpdate = true;

  // slow star rotation
  scene.children.forEach(c => {
    if (c.isPoints && c !== dust) {
      c.rotation.y = t * 0.003;
      c.rotation.x = t * 0.001;
    }
  });

  // post-process uniforms
  crtMaterial.uniforms.uTime.value = t;

  // Render to target, then post-process pass
  renderer.setRenderTarget(renderTarget);
  renderer.render(scene, camera);
  renderer.setRenderTarget(null);
  renderer.render(crtScene, crtCamera);
}
animate();

// ─── RESIZE ───
function handleResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderTarget.setSize(window.innerWidth, window.innerHeight);
  crtMaterial.uniforms.uResolution.value.set(window.innerWidth, window.innerHeight);

  // resize background plane to fill view
  const newAspect = window.innerWidth / window.innerHeight;
  const newHalfH = Math.tan(THREE.MathUtils.degToRad(20)) * bgDist;
  bgPlane.geometry.dispose();
  bgPlane.geometry = new THREE.PlaneGeometry(newHalfH * 2 * newAspect, newHalfH * 2);
  bgMaterial.uniforms.uScreenAspect.value = newAspect;
}
window.addEventListener('resize', handleResize);
window.addEventListener('orientationchange', () => setTimeout(handleResize, 150));
