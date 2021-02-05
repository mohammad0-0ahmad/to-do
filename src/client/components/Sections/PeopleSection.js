import SectionBase from '../SectionBase';
import SearchField from '../Inputs/SearchField';
import PersonCard from '../Cards/PersonCard';
import { getSuggestedFriends } from '../../services/users';
import { useEffect, useState } from 'react';
import Trans from '../Trans';
import ProgressLogo from '../Svg/ProgressLogo';
import { useUsers } from '../../context/UsersProvider';
import Button from '../Inputs/Button';

//TODO: connect it with real data.
const PeopleSection = () => {
    const { people, setPeople } = useUsers();
    const [searchKeyword, setSearchKeyword] = useState('');
    const [delayBeforeStarting, setDelayBeforeStarting] = useState(0);
    const [activeTimeoutRef, setActiveTimeoutRef] = useState();
    const [isNewMounted, setIsNewMounted] = useState(true);
    const [noMorePersonToShow, setNoMorePersonToShow] = useState(false);
    const amountPeopleTOShowByQuery = 5;

    const handleLoadMore = async () => {
        const latestFetchedUserId = people[people.length - 1]?.uid || null;
        const peopleToAdd = await getSuggestedFriends(
            searchKeyword,
            latestFetchedUserId,
            amountPeopleTOShowByQuery
        );
        peopleToAdd < amountPeopleTOShowByQuery && setNoMorePersonToShow(true);

        setPeople((current) => [...current, ...peopleToAdd]);
    };
    const search = async (searchKeyword) => {
        const peopleToSet = await getSuggestedFriends(
            searchKeyword,
            null,
            amountPeopleTOShowByQuery
        );
        setNoMorePersonToShow(
            peopleToSet.length < amountPeopleTOShowByQuery ? true : false
        );
        setPeople(peopleToSet);
    };

    useEffect(() => {
        if (searchKeyword !== '') {
            setDelayBeforeStarting(2);
        } else {
            !isNewMounted && setDelayBeforeStarting(1);
            isNewMounted && setIsNewMounted(false);
        }
    }, [searchKeyword]);

    useEffect(() => {
        clearTimeout(activeTimeoutRef);
        setActiveTimeoutRef(
            setTimeout(() => {
                setDelayBeforeStarting((current) => {
                    return current > 0 ? current - 1 : current;
                });
            }, 1000)
        );
        if (delayBeforeStarting === 1) {
            setPeople(null);
        }
        if (delayBeforeStarting === 0 && people === null) {
            search(searchKeyword);
        }
    }, [delayBeforeStarting]);

    useEffect(() => {
        return () => {
            setSearchKeyword((current) => {
                if (current !== '') {
                    search('');
                }
                return;
            });
        };
    }, []);

    return (
        <SectionBase>
            <SearchField
                label={<Trans id="PeopleSection.SearchField" />}
                onChange={({ target: { value } }) => setSearchKeyword(value)}
            />
            {people === null && <ProgressLogo />}
            {people?.length === 0
                ? 'no data to show'
                : people?.length > 0 &&
                  people.map((person) => (
                      <PersonCard key={person.uid} {...person} />
                  ))}
            {!noMorePersonToShow && (
                <Button
                    colorVariant="color3"
                    backgroundColorVariant="color4"
                    onClick={handleLoadMore}
                >
                    <Trans id="PeopleSection.button1" />
                </Button>
            )}
        </SectionBase>
    );
};

export default PeopleSection;
