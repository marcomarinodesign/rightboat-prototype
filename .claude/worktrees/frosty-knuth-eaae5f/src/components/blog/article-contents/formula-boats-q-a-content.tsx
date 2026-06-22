import Image from "next/image"

const INLINE_IMAGES = [
  {
    src: "https://www.rightboat.com/blogimages/misc/3437/3.jpg",
    alt: "The development of Formula's CBR, crossover bowrider models such as the 360 CBR, emphasizes multiple seating/entertainment areas and a large, single cabin below.",
  },
  {
    src: "https://www.rightboat.com/blogimages/misc/3438/5.jpg",
    alt: "The larger dashboard is one evolution in the new Formula 360 CBR model.",
  },
  {
    src: "https://www.rightboat.com/blogimages/misc/3439/6.jpg",
    alt: "Scott Porter, president of Formula Boats",
  },
  {
    src: "https://www.rightboat.com/blogimages/misc/3441/4.jpg",
    alt: "Over the decades, performance has been a common theme among all Formula designs, and the new 360 CBR is no exception.",
  },
  {
    src: "https://www.rightboat.com/blogimages/misc/3440/7.jpg",
    alt: "The team at Formula in Decatur, Indiana, turns out to celebrate the latest launch.",
  },
] as const

const YOUTUBE_VIDEO_ID = "GgYT4HnF9vE"
const AUTHOR_NAME = "John Burnham"

function ArticleImage({ src, alt }: { src: string; alt: string }) {
  return (
    <figure className="space-y-2">
      <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-border bg-muted">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 720px"
        />
      </div>
      <figcaption className="text-sm text-muted-foreground">{alt}</figcaption>
    </figure>
  )
}

export function FormulaBoatsQAContent() {
  return (
    <>
      <section className="space-y-6" aria-labelledby="intro-heading">
        <h2 id="intro-heading" className="sr-only">
          Introduction
        </h2>
        <p className="text-lg leading-relaxed text-foreground">
          For more than 60 years, Formula has been a brand defined by American styling performance
          and for the last 50 years, it's been owned by the Porter family. In this interview,
          Rightboat Editor John Burnham speaks with Scott Porter, president of Formula Boats, about
          the company's legacy and its design philosophy. From the evolution of Formula's crossover
          bowriders to the recent shift from John Adams to Michael Young as lead designer and the
          launch of the 360 CBR, Porter explains how Formula continues to innovate while staying true
          to its core values of outstanding quality and designs that are "evolutionary, not
          revolutionary."
        </p>
        <figure className="space-y-2">
          <a
            href={`https://www.youtube.com/watch?v=${YOUTUBE_VIDEO_ID}`}
            target="_blank"
            rel="noopener noreferrer"
            className="relative block aspect-video w-full overflow-hidden rounded-lg border border-border bg-muted"
          >
            <Image
              src={`https://img.youtube.com/vi/${YOUTUBE_VIDEO_ID}/0.jpg`}
              alt="Embedded YouTube video: Formula Boats interview"
              fill
              className="object-cover transition-opacity hover:opacity-90"
              sizes="(max-width: 768px) 100vw, 896px"
            />
          </a>
          <figcaption className="sr-only">Watch the interview on YouTube</figcaption>
        </figure>
      </section>

      <section className="space-y-8" aria-labelledby="content-heading">
        <h2 id="content-heading" className="sr-only">
          Interview
        </h2>

        <div className="space-y-6">
          <p className="font-semibold text-foreground">{AUTHOR_NAME}</p>
          <p className="leading-relaxed text-foreground">
            I know Formula is a family company. When did you start with the company, and what
            lessons did you learn early on that have stuck with you since?
          </p>
        </div>

        <div className="space-y-6">
          <p className="font-semibold text-foreground">Scott Porter</p>
          <p className="leading-relaxed text-foreground">
            Well, our family has actually been blessed to own the company for nearly 50 years. We
            actually go back in the boat business farther than that—our dad started building boats
            in 1958—but in 1973 we became associated with Thunderbird/Formula, and then we bought the
            company in 1976, so next April, we'll celebrate 50 years. I just celebrated 50 years
            myself of full-time employment, although I have to admit, I worked for my dad when I was
            quite young and probably wasn't supposed to but that's the way it was back then. I
            learned a lot about the business, and I'm glad that our dad really focused on quality,
            because that's what we do. We are really the best boat that there is, and I don't just
            say that. I know that, and we focus on that all the time. And I thank my dad for that,
            that he was always focused on quality. We're not after building great volume; we'll build
            150 to 200 boats a year, but we really focus on detail and fit and finish. And you know,
            when you've been at it for 50 years, you go through a lot of ups and downs in the
            industry, and you learn a lot about the economy and what's going on, and you just learn
            what it takes to kind of soldier through those things. But even when things are slower
            than you'd like, we still focus on trying to build the best boat we can and just keep
            working on technology and design, just making the boats the best that they are.
          </p>
        </div>

        <ArticleImage src={INLINE_IMAGES[0].src} alt={INLINE_IMAGES[0].alt} />

        <div className="space-y-6">
          <p className="font-semibold text-foreground">Burnham</p>
          <p className="leading-relaxed text-foreground">
            Who buys Formula boats and how has that changed or stayed consistent over the years?
          </p>
        </div>

        <div className="space-y-6">
          <p className="font-semibold text-foreground">Porter</p>
          <p className="leading-relaxed text-foreground">
            Well, I would say our clientele have stayed fairly consistent. They're people who, just as
            we want to build the best quality that we can, they want to buy the best quality that
            they can. They typically are professional people who might own a business, or they're in a
            large business and successful at it. I think that's stayed fairly consistent, even though
            the boats have grown up over time. When we bought the company, the largest boat that
            Formula built was a 26-footer. Today, we build a 50-footer. The smallest boat we build is
            a 24, so things have changed quite a bit. I think the clients, though, have stayed the
            same, and it's a lot of fun to work with people, to build them a boat of their dreams;
            when they really respect the quality, it is a lot of fun. And we have a program called
            Flex to allow someone to be able to semi-customize their boat, or really put their
            personality into it. We do that through graphic designs. There's several for each boat
            that you can choose from. We have our stock paint colors because we Imron all the
            outside of our boats where other people are just doing gel coat, and all of our colored
            paints are actually automotive paint with Imron over it, so they're very durable. It
            allows us the flexibility to have almost no two boats look alike. That's a lot of fun.
            It's fun to help people create the boat of their dreams and to see them out on the
            production line, and we really love having people come to our factory, too. We're in
            Decatur, Indiana, just south of Fort Wayne. Maybe not the easiest place to get to, but
            not difficult also. It's just a lot of fun to have people come and see all of the
            craftsmanship that still goes into something like this.
          </p>
        </div>

        <ArticleImage src={INLINE_IMAGES[1].src} alt={INLINE_IMAGES[1].alt} />

        <div className="space-y-6">
          <p className="font-semibold text-foreground">Burnham</p>
          <p className="leading-relaxed text-foreground">
            I'll bet. So, I've seen that most of your boats are crossovers, if not a bowrider or
            center console. When did you start using that term, and how do you define it?
          </p>
        </div>

        <div className="space-y-6">
          <p className="font-semibold text-foreground">Porter</p>
          <p className="leading-relaxed text-foreground">
            A crossover bowrider to us… this goes back to the teens. We wanted to build a larger
            bowrider, but we didn't like separating the head compartment from the cabin. We wanted
            those both to be together, and that's when we defined the term crossover. It could be a
            great cabin boat, but it could also be a great day boat, because it's got a bowrider or a
            forward cockpit, a large cockpit in the back, and then just a really nice cabin. Crossover
            bowriders for us are a cabin that has everything contained in one compartment. So, if you
            want to sleep on the boat and make it be usable, it's just really easy. That was our
            first crossover bowrider, 35 feet. We grew down to 33 and now we've grown up all the
            way to 500— although we don't call it a CBR, it's that style of a large cabin with
            everything contained, and a great amount of seating for great day boating.
          </p>
        </div>

        <div className="space-y-6">
          <p className="font-semibold text-foreground">Burnham</p>
          <p className="leading-relaxed text-foreground">
            So the new 360 CBR is brand new, and it has a new designer. I know you've had consistency
            in design for a long time. I'm curious what's been the reaction to having a new designer
            lead the program?
          </p>
        </div>

        <ArticleImage src={INLINE_IMAGES[2].src} alt={INLINE_IMAGES[2].alt} />

        <div className="space-y-6">
          <p className="font-semibold text-foreground">Porter</p>
          <p className="leading-relaxed text-foreground">
            Great question. You know, Formula, from the time that we became associated with it, had a
            brilliant young designer, John Adams, and John designed and evolved the design of the
            Formula over the decades. All good things change at some point in time. And John was
            getting to a point where he was starting to think about not designing boats, so we
            needed to work on a new designer. So John Adams trained our new designer, Michael Young,
            and Michael has just done a phenomenal job. He did two projects with John before he took
            over doing the 360 by himself, and we're thrilled. Yet we know that we've always been
            successful with a phrase that John Adams coined, and that is to be evolutionary and not
            revolutionary. So that is something we've ingrained into Michael, because he, you know,
            would like to run 150 miles an hour, but you have to watch that things don't get too far
            ahead of the marketplace. And yet you want to have great talent, because you want them to
            unleash that and to be able to keep pushing things forward. So, we're very excited. The
            boat is still a Formula when you look at it in styling and graphics, and yet we've
            evolved some of the styling of dash areas to be able to enhance larger electronics. We
            have more effective cabin down below with a stand-up head on the center line and just
            some really neat features that by just stretching the boat a foot in length and six
            inches in beam over our very, very successful 350 CBR, we're able to do a just a really
            neat new boat. And so far, the reaction has been spectacular. It really has. We've taken
            several orders for them, so we're very excited about that. We know it's going to
            continue to be received well.
          </p>
        </div>

        <div className="space-y-6">
          <p className="font-semibold text-foreground">Burnham</p>
          <p className="leading-relaxed text-foreground">
            When I talked to Michael yesterday, I asked him how free a hand he had, and he said that
            he was leading the project, but he gets a lot of review and input from the whole
            leadership team, and that's how I assume you maintain that evolutionary, not
            revolutionary approach.
          </p>
        </div>

        <ArticleImage src={INLINE_IMAGES[3].src} alt={INLINE_IMAGES[3].alt} />

        <div className="space-y-6">
          <p className="font-semibold text-foreground">Porter</p>
          <p className="leading-relaxed text-foreground">
            Yes, the really important thing is to realize that it can't just be a designer. Yes, you
            need that talent, but you need the other people in that team who are involved, [such as]
            the engineers who know what can be molded. A lot of people don't think about that but all
            these fiberglass parts are molded, and you can do some neat things with them, but they
            still have to be able to come out of those molds. And sometimes we have take-apart
            molds…it gets that complicated, but the engineering staff help make sure that it can be
            built. We even get the manufacturing team involved to make sure we can produce it. And
            then we also have other people who are very knowledgeable, from a boating perspective,
            to make sure that it is going to really deliver to the consumer what we want it to. So
            it's a team effort, and I think that Michael knows that, and he's excited to be part of
            that team. We also appreciate his design capability and are looking forward to that
            continual evolution over time.
          </p>
        </div>

        <div className="space-y-6">
          <p className="font-semibold text-foreground">Burnham</p>
          <p className="leading-relaxed text-foreground">
            I wanted to rewind a little bit personally with you now. As a teenager in the early
            '70s, I used to clean a sporty little Formula. I looked it up in your brochures, and I
            think it was a 233. I learned to oil teak on its cockpit sole, and I'm just curious
            when you're going to bring back the teak deck?
          </p>
        </div>

        <div className="space-y-6">
          <p className="font-semibold text-foreground">Porter</p>
          <p className="leading-relaxed text-foreground">
            Well, one of the challenges that we had with the teak is that people didn't mind, back
            then, the maintenance aspect of it, but today, people are more interested in putting
            their effort into going out, boating. A lot of the materials that we choose now look like
            they're of old and they look like they might be teak, but they're really more durable.
            You don't have to do the maintenance on them. I'm not going to say you won't see teak
            come back. Some people do it in some of their boats, but again, a lot of our clients are
            just really interested in in having someone maintain their boat, but not have to go too
            wild with it.
          </p>
        </div>

        <div className="space-y-6">
          <p className="font-semibold text-foreground">Burnham</p>
          <p className="leading-relaxed text-foreground">Evolutionary, like you said!</p>
        </div>

        <ArticleImage src={INLINE_IMAGES[4].src} alt={INLINE_IMAGES[4].alt} />

        <div className="space-y-6">
          <p className="font-semibold text-foreground">Porter</p>
          <p className="leading-relaxed text-foreground">
            Evolution! It is amazing, the evolution of the materials that we've been able to
            incorporate into the boats, and we're always looking at that. We need to make sure
            they're going to be durable enough to meet our standards. So the teak is beautiful. We
            actually have a 233 in our display. We have kind of a vintage boat display back at our
            showroom in Indiana, and we have a beautiful yellow with tan interior 233 that—I know
            this is going to sound strange—it was never sold at retail. One of our dealers just kind
            of held it as a collector thing for a while, and then we bought it back from him. So, it
            was manufactured in 1976 about the time we bought the company. It's kind of neat to have
            that around and be able to see the evolution of styling, it's a great way to actually
            see it from the mid-'70s 'til today.
          </p>
        </div>

        <div className="space-y-6">
          <p className="font-semibold text-foreground">Burnham</p>
          <p className="leading-relaxed text-foreground">
            Scott, thanks very much for your time today. I think Rightboat visitors can learn a lot
            from you and from the example of Formula.
          </p>
        </div>

        <div className="space-y-6">
          <p className="font-semibold text-foreground">Porter</p>
          <p className="leading-relaxed text-foreground">
            Thank you. We appreciate the opportunity again. We have a beautiful facility in Decatur,
            Indiana, a great place to meet clients, and the tour is amazing. You will see the best
            crafts persons that there are in the industry. They love what they do, and they love
            stopping and just answering questions for folks. So we invite people to come for a tour
            at any time.
          </p>
        </div>

        <div className="space-y-6">
          <p className="font-semibold text-foreground">Burnham</p>
          <p className="leading-relaxed text-foreground">And see a vintage 233!</p>
        </div>

        <div className="space-y-6">
          <p className="font-semibold text-foreground">Porter</p>
          <p className="leading-relaxed text-foreground">For sure.</p>
        </div>
      </section>
    </>
  )
}
